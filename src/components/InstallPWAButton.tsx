'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualTip, setShowManualTip] = useState(false);

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const dismissed = localStorage.getItem('pwa-banner-dismissed-v2');
    if (!dismissed) {
      // Show banner after a short delay regardless of beforeinstallprompt
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const dismissed = localStorage.getItem('pwa-banner-dismissed-v2');
      if (!dismissed) setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
        setDeferredPrompt(null);
        setIsInstalled(true);
      }
    } else {
      // No native prompt — show manual instructions
      setShowManualTip(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowManualTip(false);
    localStorage.setItem('pwa-banner-dismissed-v2', 'true');
  };

  if (isInstalled || !showBanner) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
    >
      <div className="flex items-start gap-3 px-4 py-3 max-w-lg mx-auto">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 flex-shrink-0 mt-0.5">
          <Smartphone size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          {!showManualTip ? (
            <>
              <p className="text-sm font-600 text-white">Instalar app en tu móvil</p>
              <p className="text-xs text-white/75">Accede sin conexión durante el viaje</p>
            </>
          ) : (
            <>
              <p className="text-sm font-600 text-white">Cómo instalar</p>
              <p className="text-xs text-white/80 leading-relaxed">
                <strong>Android:</strong> Menú del navegador → &quot;Añadir a pantalla de inicio&quot;
                <br />
                <strong>iPhone:</strong> Botón compartir → &quot;Añadir a pantalla de inicio&quot;
              </p>
            </>
          )}
        </div>
        {!showManualTip && (
          <button
            onClick={handleInstall}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-600 transition-all duration-150 active:scale-95"
            style={{ background: 'var(--secondary)', color: 'white' }}
          >
            <Download size={13} />
            Instalar
          </button>
        )}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-lg transition-all duration-150 active:scale-95 text-white/70 hover:text-white mt-0.5"
          aria-label="Cerrar banner de instalación"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}