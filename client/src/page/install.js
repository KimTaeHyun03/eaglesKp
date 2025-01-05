import React, { useState, useEffect } from 'react';

function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // 브라우저에서 PWA 설치를 지원하면 beforeinstallprompt 이벤트 발생
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // 기본 동작 방지
      setDeferredPrompt(event); // 이벤트 객체 저장
      setIsInstallable(true); // 설치 가능 상태 설정
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // 설치 팝업 표시
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('사용자가 앱을 설치했습니다.');
        } else {
          console.log('사용자가 앱 설치를 취소했습니다.');
        }
        setDeferredPrompt(null); // 이벤트 객체 초기화
      });
    }
  };

  return (
    <div>
      {isInstallable ? (
        <button onClick={handleInstallClick}>앱 설치</button>
      ) : (
        <p>앱 설치를 지원하지 않는 환경입니다.</p>
      )}
    </div>
  );
}

export default Install;