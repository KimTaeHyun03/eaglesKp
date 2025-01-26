import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
/* eslint-disable no-restricted-globals */
clientsClaim();

// 캐시 이름에 버전 추가
const CACHE_VERSION = 'v1.2.7';
const RUNTIME_CACHE = `runtime-cache-${CACHE_VERSION}`;

// 기존 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== RUNTIME_CACHE) {
            console.log(`삭제된 캐시: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Precache 설정
precacheAndRoute(self.__WB_MANIFEST);

// App Shell-style routing 설정
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// 이미지 캐싱 설정
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// 동적 캐싱 관리 (Network First)
registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: RUNTIME_CACHE,
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// 업데이트 알림 및 바로 반영
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// fetch 이벤트 처리
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
        );
      })
    );
  }
});