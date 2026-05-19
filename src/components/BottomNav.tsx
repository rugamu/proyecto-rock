'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Wallet, Plane, Luggage, Bookmark } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  { href: '/', label: 'Itinerario', icon: Map },
  { href: '/presupuesto', label: 'Presupuesto', icon: Wallet },
  { href: '/alojamientos-y-vuelos', label: 'Reservas', icon: Plane },
  { href: '/equipaje', label: 'Equipaje', icon: Luggage },
  { href: '/sitios-guardados', label: 'Sitios', icon: Bookmark },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bottom-nav-safe"
      style={{ background: 'var(--card)', borderTop: '1px solid var(--border)' }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {navItems?.map((item) => {
          const Icon = item?.icon;
          const isActive = pathname === item?.href;
          return (
            <Link
              key={`nav-${item?.href}`}
              href={item?.href}
              className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 flex-1 transition-all duration-150"
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(30,58,95,0.12)' : 'transparent',
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{ color: isActive ? 'var(--primary)' : 'var(--muted-foreground)' }}
                />
              </div>
              <span
                className="text-xs transition-all duration-200"
                style={{
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.65rem',
                }}
              >
                {item?.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}