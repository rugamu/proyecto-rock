import React from 'react';
import BottomNav from '@/components/BottomNav';
import InstallPWAButton from '@/components/InstallPWAButton';
import AlojamientosVuelosClient from './components/AlojamientosVuelosClient';

export default function AlojamientosVuelosPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <InstallPWAButton />

      <header
        className="sticky top-0 z-40"
        style={{ background: 'var(--primary)' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-700 text-white">✈️ Reservas</h1>
            <p className="text-xs text-white/70">Vuelos y alojamientos · Grecia &amp; Milán 2026</p>
          </div>
          <div
            className="px-3 py-1.5 rounded-xl text-xs font-600"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
          >
            22 ago – 13 sep
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-28 pt-4">
        <AlojamientosVuelosClient />
      </main>

      <BottomNav />
    </div>
  );
}