import React, { useEffect } from "react";

const RedirectToChrome = () => {
  useEffect(() => {
    const redirectUrl =
      "intent://port-0-eagleskp-m5dahxe3d1a3c3c2.sel4.cloudtype.app/#Intent;scheme=https;package=com.android.chrome;end;";
    const chromePlayStoreUrl =
      "https://play.google.com/store/apps/details?id=com.android.chrome";

    const checkChrome = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        // Check if Chrome is installed
        const isChromeInstalled = userAgent.includes("Chrome");

        if (isChromeInstalled) {
          // Chrome is installed, use intent://
          window.location.href = redirectUrl;
        } else {
          // Chrome is not installed, redirect to Play Store
          window.location.href = chromePlayStoreUrl;
        }
      } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        // iOS Device
        if (userAgent.includes("CriOS")) {
          // Chrome is installed on iOS
          window.location.href = "https://port-0-eagleskp-m5dahxe3d1a3c3c2.sel4.cloudtype.app/";
        } else {
          // Chrome is not installed on iOS, redirect to App Store
          window.location.href = "https://apps.apple.com/app/google-chrome/id535886823";
        }
      } else {
        // Unsupported Platform
        alert("This feature requires Google Chrome.");
      }
    };

    checkChrome();
  }, []);

  return (
    <div>
      <p>Redirecting to Chrome...</p>
    </div>
  );
};

export default RedirectToChrome;