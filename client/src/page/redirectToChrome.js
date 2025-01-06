import React, { useEffect } from "react";

const RedirectToChrome = () => {
  useEffect(() => {
    const redirectUrl =
      "intent://port-0-eagleskp-m5dahxe3d1a3c3c2.sel4.cloudtype.app/#Intent;scheme=https;package=com.android.chrome;end;";

    const checkChrome = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        // Android Device
        window.location.href = redirectUrl;
        setTimeout(() => {
          // Fallback to Google Play if Chrome is not installed
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.android.chrome";
        }, 2000); // Wait 2 seconds before fallback
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
        // Other Platforms or Unsupported
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