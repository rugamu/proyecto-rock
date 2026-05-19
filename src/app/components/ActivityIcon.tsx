import React from 'react';
import { Waves, Landmark, Car, UtensilsCrossed, Compass, Anchor, Ship, Plane, Sun, Activity,  } from 'lucide-react';
import type { ActivityType } from '@/lib/tripData';
import Icon from '@/components/ui/AppIcon';


interface ActivityIconProps {
  type: ActivityType;
  size?: number;
}

const iconMap: Record<ActivityType, { Icon: React.ElementType; color: string; bg: string }> = {
  playa: { Icon: Waves, color: '#0e6b8f', bg: 'rgba(14,107,143,0.12)' },
  cultura: { Icon: Landmark, color: '#1e3a5f', bg: 'rgba(30,58,95,0.12)' },
  traslado: { Icon: Car, color: '#6b7a8d', bg: 'rgba(107,122,141,0.12)' },
  gastronomia: { Icon: UtensilsCrossed, color: '#b45309', bg: 'rgba(180,83,9,0.12)' },
  snorkel: { Icon: Activity, color: '#0891b2', bg: 'rgba(8,145,178,0.12)' },
  excursion: { Icon: Compass, color: '#0f7b4e', bg: 'rgba(15,123,78,0.12)' },
  kayak: { Icon: Anchor, color: '#0e6b8f', bg: 'rgba(14,107,143,0.12)' },
  barco: { Icon: Ship, color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  vuelo: { Icon: Plane, color: '#c1440e', bg: 'rgba(193,68,14,0.12)' },
  libre: { Icon: Sun, color: '#d97706', bg: 'rgba(217,119,6,0.12)' },
};

export default function ActivityIcon({ type, size = 16 }: ActivityIconProps) {
  const { Icon, color, bg } = iconMap[type] || iconMap.libre;
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 rounded-lg"
      style={{ background: bg, width: size + 16, height: size + 16 }}
    >
      <Icon size={size} style={{ color }} strokeWidth={2} />
    </div>
  );
}

export function activityTypeLabel(type: ActivityType): string {
  const labels: Record<ActivityType, string> = {
    playa: 'Playa',
    cultura: 'Cultura',
    traslado: 'Traslado',
    gastronomia: 'Gastronomía',
    snorkel: 'Snorkel',
    excursion: 'Excursión',
    kayak: 'Kayak',
    barco: 'Barco',
    vuelo: 'Vuelo',
    libre: 'Libre',
  };
  return labels[type] || type;
}