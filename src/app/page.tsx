import React from 'react';
import BottomNav from '@/components/BottomNav';
import InstallPWAButton from '@/components/InstallPWAButton';
import ItinerarioClient from './components/ItinerarioClient';

export default function ItinerarioPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <InstallPWAButton />

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 pt-safe"
        style={{ background: 'var(--primary)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between py-4">
          <div>
            <h1 className="text-lg font-700 text-white leading-tight">
              🗺️ Itinerario
            </h1>
            <p className="text-xs text-white/70">22 ago – 13 sep 2026 · Rubén &amp; Virginia</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="badge badge-terracotta text-xs" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
              🇬🇷 Grecia
            </span>
            <span className="badge text-xs" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
              🇮🇹 Milán
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto pb-28 pt-4">
        <ItinerarioClient />
      </main>

      <BottomNav />
    </div>
  );
}