import React, { useEffect } from 'react';
import { useTranslation } from '../i18n';

interface AdBannerProps {
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export function AdBanner({ adSlot, adFormat = 'auto', className = '' }: AdBannerProps) {
  const { t } = useTranslation();

  // In a real implementation, you would load the Google AdSense script in index.html
  // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
  
  useEffect(() => {
    // Dynamically inject script if it doesn't exist
    const client = import.meta.env?.VITE_ADSENSE_CLIENT_ID || "ca-pub-7988921306352815";
    let script = document.querySelector(`script[src*="adsbygoogle.js"]`);
    if (!script) {
      script = document.createElement('script');
      (script as HTMLScriptElement).src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      (script as HTMLScriptElement).async = true;
      (script as HTMLScriptElement).crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  
    if (!adSlot) return;

    // Push ads to the array when the component mounts
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err: any) {
      if (err.message && err.message.includes('already have ads')) {
        // Ignored. This typically happens in React StrictMode during dev
        console.warn('AdSense already loaded for this banner.');
      } else {
        console.error('AdSense error:', err);
      }
    }
  }, [adSlot]);

  if (!adSlot) {
    // Return a placeholder for development/preview
    return (
      <div className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 text-gray-400 text-sm overflow-hidden ${className}`}>
        [ Espaço para Anúncio - AdSense ]
      </div>
    );
  }

  return (
    <div className={`overflow-hidden flex justify-center ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env?.VITE_ADSENSE_CLIENT_ID || "ca-pub-7988921306352815"}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
