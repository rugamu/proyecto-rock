'use client';

import React, { useState } from 'react';
import {
  Plane, Building2, Clock, Calendar, Moon, Euro,
  MapPin, ChevronRight, Star,
} from 'lucide-react';

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface FlightData {
  id: string;
  route: string;
  from: string;
  to: string;
  airline: string;
  airlineCode: string;
  date: string;
  departure: string;
  arrival: string;
  price: number;
  flightNumber?: string;
  fromCode: string;
  toCode: string;
}

interface AccommodationData {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number;
  type: string;
  mapsQuery: string;
  emoji: string;
}

const FLIGHTS: FlightData[] = [
  {
    id: 'flight-mad-ath',
    route: 'Madrid → Atenas',
    from: 'Madrid',
    to: 'Atenas',
    fromCode: 'MAD',
    toCode: 'ATH',
    airline: 'Iberia',
    airlineCode: 'IB',
    date: '22/08/2026',
    departure: '20:00',
    arrival: '00:40',
    price: 183.14,
    flightNumber: 'IB 3742',
  },
  {
    id: 'flight-ath-mxp',
    route: 'Atenas → Milán',
    from: 'Atenas',
    to: 'Milán (Malpensa)',
    fromCode: 'ATH',
    toCode: 'MXP',
    airline: 'Ryanair',
    airlineCode: 'FR',
    date: '10/09/2026',
    departure: '15:35',
    arrival: '17:15',
    price: 191.06,
    flightNumber: 'FR 9021',
  },
  {
    id: 'flight-mxp-mad',
    route: 'Milán → Madrid',
    from: 'Milán (Malpensa)',
    to: 'Madrid',
    fromCode: 'MXP',
    toCode: 'MAD',
    airline: 'Iberia',
    airlineCode: 'IB',
    date: '13/09/2026',
    departure: '14:45',
    arrival: '17:05',
    price: 135.18,
    flightNumber: 'IB 3621',
  },
];

const ACCOMMODATIONS: AccommodationData[] = [
  {
    id: 'aloj-calcis',
    name: 'Calcis',
    location: 'Eubea, Grecia',
    checkIn: '22/08/2026',
    checkOut: '26/08/2026',
    nights: 4,
    price: 275.53,
    type: 'Hotel',
    mapsQuery: 'Calcis Eubea Grecia hotel',
    emoji: '🏖️',
  },
  {
    id: 'aloj-nauplia',
    name: 'La Casa de los Conejos',
    location: 'Nauplia, Peloponeso',
    checkIn: '26/08/2026',
    checkOut: '31/08/2026',
    nights: 5,
    price: 368.81,
    type: 'B&B',
    mapsQuery: 'La Casa de los Conejos Nauplia Grecia',
    emoji: '🏛️',
  },
  {
    id: 'aloj-kalamata',
    name: 'Airbnb Akrita 32',
    location: 'Kalamata, Peloponeso',
    checkIn: '31/08/2026',
    checkOut: '05/09/2026',
    nights: 5,
    price: 367.83,
    type: 'Airbnb',
    mapsQuery: 'Akrita 32 Kalamata Grecia',
    emoji: '🫒',
  },
  {
    id: 'aloj-lefkada',
    name: 'Aeraki House',
    location: 'Lefkada, Islas Jónicas',
    checkIn: '05/09/2026',
    checkOut: '10/09/2026',
    nights: 5,
    price: 285.00,
    type: 'Casa rural',
    mapsQuery: 'Aeraki House Lefkada Grecia',
    emoji: '⛵',
  },
  {
    id: 'aloj-milan',
    name: 'Apartamento Navigli',
    location: 'Navigli, Milán',
    checkIn: '10/09/2026',
    checkOut: '13/09/2026',
    nights: 3,
    price: 354.00,
    type: 'Apartamento',
    mapsQuery: 'Navigli Milán Italia apartamento',
    emoji: '🏙️',
  },
];

const TOTAL_FLIGHTS = FLIGHTS.reduce((a, f) => a + f.price, 0);
const TOTAL_ACCOMMODATIONS = ACCOMMODATIONS.reduce((a, ac) => a + ac.price, 0);
const TOTAL_NIGHTS = ACCOMMODATIONS.reduce((a, ac) => a + ac.nights, 0);

function formatEur(amount: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
}

// ─── Flight Card — Boarding Pass Style ───────────────────────────────────────

function FlightCard({ flight }: { flight: FlightData }) {
  const airlineColor = flight.airline === 'Iberia' ? '#c1440e' : '#1e3a5f';

  return (
    <div
      className="card overflow-hidden mb-3 card-shadow"
      style={{ border: `1.5px solid ${airlineColor}25` }}
    >
      {/* Airline header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ background: `${airlineColor}10` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-700 text-white"
            style={{ background: airlineColor }}
          >
            {flight.airlineCode}
          </div>
          <span className="text-xs font-600" style={{ color: airlineColor }}>
            {flight.airline}
          </span>
          {flight.flightNumber && (
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              · {flight.flightNumber}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={12} style={{ color: 'var(--muted-foreground)' }} />
          <span className="text-xs font-600" style={{ color: 'var(--muted-foreground)' }}>
            {flight.date}
          </span>
        </div>
      </div>

      {/* Route */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="text-center flex-shrink-0">
            <p className="text-xl font-700 tabular-nums" style={{ color: 'var(--foreground)' }}>
              {flight.fromCode}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {flight.from.split(' ')[0]}
            </p>
            <p className="text-base font-700 tabular-nums mt-1" style={{ color: airlineColor }}>
              {flight.departure}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 w-full">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <Plane size={16} style={{ color: airlineColor }} className="rotate-90 flex-shrink-0" />
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              directo
            </span>
          </div>

          <div className="text-center flex-shrink-0">
            <p className="text-xl font-700 tabular-nums" style={{ color: 'var(--foreground)' }}>
              {flight.toCode}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {flight.to.split(' ')[0]}
            </p>
            <p className="text-base font-700 tabular-nums mt-1" style={{ color: airlineColor }}>
              {flight.arrival}
            </p>
          </div>
        </div>
      </div>

      {/* Dashed separator */}
      <div className="boarding-pass-dashes mx-4" />

      {/* Price footer */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock size={12} style={{ color: 'var(--muted-foreground)' }} />
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {flight.departure} → {flight.arrival}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Euro size={14} style={{ color: airlineColor }} />
          <span className="text-base font-700 tabular-nums" style={{ color: airlineColor }}>
            {formatEur(flight.price)}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            /2 pax
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Accommodation Card ───────────────────────────────────────────────────────

function AccommodationCard({ accommodation }: { accommodation: AccommodationData }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(accommodation.mapsQuery)}`;

  return (
    <div className="card overflow-hidden mb-3 card-shadow">
      <div className="px-4 py-3.5">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'rgba(30,58,95,0.08)' }}
          >
            {accommodation.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-700 leading-tight" style={{ color: 'var(--foreground)' }}>
                  {accommodation.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} style={{ color: 'var(--muted-foreground)' }} />
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {accommodation.location}
                  </p>
                </div>
              </div>
              <span
                className="badge badge-blue text-xs flex-shrink-0"
              >
                {accommodation.type}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2.5 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar size={12} style={{ color: 'var(--primary)' }} />
                <span className="text-xs font-600" style={{ color: 'var(--foreground)' }}>
                  {accommodation.checkIn}
                </span>
                <ChevronRight size={11} style={{ color: 'var(--muted-foreground)' }} />
                <span className="text-xs font-600" style={{ color: 'var(--foreground)' }}>
                  {accommodation.checkOut}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Moon size={12} style={{ color: 'var(--primary)' }} />
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {accommodation.nights} noches
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-3 pt-3 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-500 transition-all duration-150 hover:opacity-80"
            style={{ color: 'var(--primary)' }}
          >
            <MapPin size={13} />
            Ver en Maps
          </a>
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Total:</span>
            <span className="text-base font-700 tabular-nums" style={{ color: 'var(--primary)' }}>
              {formatEur(accommodation.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlojamientosVuelosClient() {
  const [activeTab, setActiveTab] = useState<'vuelos' | 'alojamientos'>('vuelos');

  return (
    <div className="px-4 pb-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div
          className="rounded-2xl p-3.5 card-shadow"
          style={{ background: 'var(--primary)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Plane size={16} className="text-white/80" />
            <p className="text-xs font-600 text-white/80">3 vuelos</p>
          </div>
          <p className="text-xl font-700 tabular-nums text-white">{formatEur(TOTAL_FLIGHTS)}</p>
          <p className="text-xs text-white/60 mt-0.5">total vuelos</p>
        </div>
        <div
          className="rounded-2xl p-3.5 card-shadow"
          style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Building2 size={16} style={{ color: 'var(--primary)' }} />
            <p className="text-xs font-600" style={{ color: 'var(--muted-foreground)' }}>
              5 aloj. · {TOTAL_NIGHTS}n
            </p>
          </div>
          <p className="text-xl font-700 tabular-nums" style={{ color: 'var(--primary)' }}>
            {formatEur(TOTAL_ACCOMMODATIONS)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            total alojamientos
          </p>
        </div>
      </div>

      {/* Total */}
      <div
        className="rounded-2xl px-4 py-3 mb-4 flex items-center justify-between"
        style={{ background: 'rgba(30,58,95,0.06)', border: '1px solid rgba(30,58,95,0.12)' }}
      >
        <div className="flex items-center gap-2">
          <Star size={14} style={{ color: 'var(--primary)' }} />
          <p className="text-sm font-600" style={{ color: 'var(--primary)' }}>
            Total vuelos + alojamientos
          </p>
        </div>
        <p className="text-base font-700 tabular-nums" style={{ color: 'var(--primary)' }}>
          {formatEur(TOTAL_FLIGHTS + TOTAL_ACCOMMODATIONS)}
        </p>
      </div>

      {/* Tab switcher */}
      <div
        className="flex rounded-xl p-1 mb-4"
        style={{ background: 'var(--muted)' }}
        role="tablist"
      >
        <button
          role="tab"
          aria-selected={activeTab === 'vuelos'}
          onClick={() => setActiveTab('vuelos')}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-600 transition-all duration-200"
          style={{
            background: activeTab === 'vuelos' ? 'var(--card)' : 'transparent',
            color: activeTab === 'vuelos' ? 'var(--primary)' : 'var(--muted-foreground)',
            boxShadow: activeTab === 'vuelos' ? '0 1px 4px rgba(30,58,95,0.12)' : 'none',
          }}
        >
          <Plane size={15} />
          Vuelos (3)
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'alojamientos'}
          onClick={() => setActiveTab('alojamientos')}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-600 transition-all duration-200"
          style={{
            background: activeTab === 'alojamientos' ? 'var(--card)' : 'transparent',
            color: activeTab === 'alojamientos' ? 'var(--primary)' : 'var(--muted-foreground)',
            boxShadow: activeTab === 'alojamientos' ? '0 1px 4px rgba(30,58,95,0.12)' : 'none',
          }}
        >
          <Building2 size={15} />
          Alojamientos (5)
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'vuelos' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-700" style={{ color: 'var(--foreground)' }}>
              Vuelos del viaje
            </p>
            <span className="badge badge-green text-xs">✓ Todos pagados</span>
          </div>
          {FLIGHTS.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between mt-1"
            style={{ background: 'rgba(193,68,14,0.06)', border: '1px solid rgba(193,68,14,0.15)' }}
          >
            <p className="text-sm font-600" style={{ color: 'var(--secondary)' }}>Total vuelos</p>
            <p className="text-base font-700 tabular-nums" style={{ color: 'var(--secondary)' }}>
              {formatEur(TOTAL_FLIGHTS)}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'alojamientos' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-700" style={{ color: 'var(--foreground)' }}>
              Alojamientos del viaje
            </p>
            <span className="badge badge-green text-xs">✓ Todos reservados</span>
          </div>
          {ACCOMMODATIONS.map((aloj) => (
            <AccommodationCard key={aloj.id} accommodation={aloj} />
          ))}
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between mt-1"
            style={{ background: 'rgba(30,58,95,0.06)', border: '1px solid rgba(30,58,95,0.15)' }}
          >
            <div>
              <p className="text-sm font-600" style={{ color: 'var(--primary)' }}>Total alojamientos</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {TOTAL_NIGHTS} noches · 5 destinos
              </p>
            </div>
            <p className="text-base font-700 tabular-nums" style={{ color: 'var(--primary)' }}>
              {formatEur(TOTAL_ACCOMMODATIONS)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}