'use client';

import React, { useState, useEffect } from 'react';
import { TRIP_STAGES } from '@/lib/tripData';
import DayCard from './DayCard';
import type { TripStage, TripDay } from '@/lib/tripData';

const LS_KEY = 'viaje-griegos-itinerario-v2';

function loadStages(): TripStage[] {
  if (typeof window === 'undefined') return TRIP_STAGES;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return TRIP_STAGES;
    return JSON.parse(raw) as TripStage[];
  } catch {
    return TRIP_STAGES;
  }
}

export default function ItinerarioClient() {
  const [stages, setStages] = useState<TripStage[]>(TRIP_STAGES);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    setStages(loadStages());
  }, []);

  const saveStages = (updated: TripStage[]) => {
    setStages(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  };

  const handleUpdateDay = (stageId: string, updatedDay: TripDay) => {
    const updated = stages.map((s) =>
      s.id === stageId
        ? { ...s, days: s.days.map((d) => (d.id === updatedDay.id ? updatedDay : d)) }
        : s
    );
    saveStages(updated);
  };

  const totalDays = stages.reduce((acc, s) => acc + s.days.length, 0);
  const totalActivities = stages.reduce(
    (acc, s) => acc + s.days.reduce((a2, d) => a2 + d.activities.length, 0),
    0
  );

  const activeStage = stages[activeStageIndex];

  return (
    <div>
      {/* Stats bar */}
      <div
        className="mx-4 mb-4 rounded-2xl px-4 py-3 flex items-center justify-around"
        style={{ background: 'rgba(30,58,95,0.06)', border: '1px solid rgba(30,58,95,0.12)' }}
      >
        <div className="text-center">
          <p className="text-lg font-700 tabular-nums" style={{ color: 'var(--primary)' }}>23</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>días totales</p>
        </div>
        <div className="w-px h-8" style={{ background: 'var(--border)' }} />
        <div className="text-center">
          <p className="text-lg font-700 tabular-nums" style={{ color: 'var(--primary)' }}>{totalDays}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>días planificados</p>
        </div>
        <div className="w-px h-8" style={{ background: 'var(--border)' }} />
        <div className="text-center">
          <p className="text-lg font-700 tabular-nums" style={{ color: 'var(--primary)' }}>{totalActivities}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>actividades</p>
        </div>
        <div className="w-px h-8" style={{ background: 'var(--border)' }} />
        <div className="text-center">
          <p className="text-lg font-700 tabular-nums" style={{ color: 'var(--primary)' }}>5</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>destinos</p>
        </div>
      </div>

      {/* Stage sub-tabs */}
      <div className="px-4 mb-3">
        <div
          className="flex gap-1 p-1 rounded-2xl overflow-x-auto"
          style={{ background: 'rgba(30,58,95,0.06)', border: '1px solid rgba(30,58,95,0.12)' }}
        >
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]"
                style={{
                  background: isActive ? stage.bgColor : 'transparent',
                  border: isActive ? `1.5px solid ${stage.color}40` : '1.5px solid transparent',
                }}
              >
                <span className="text-base leading-none">{stage.emoji}</span>
                <span
                  className="text-[10px] font-600 leading-tight text-center"
                  style={{ color: isActive ? stage.color : 'var(--muted-foreground)' }}
                >
                  {stage.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active stage header */}
      {activeStage && (
        <div className="px-4">
          <div
            className="rounded-2xl px-4 py-3 mb-3"
            style={{ background: activeStage.bgColor, border: `1.5px solid ${activeStage.color}30` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none">{activeStage.emoji}</span>
              <div>
                <p className="text-sm font-700" style={{ color: activeStage.color }}>
                  {activeStage.name} — {activeStage.subtitle}
                </p>
                <p className="text-xs" style={{ color: activeStage.color, opacity: 0.75 }}>
                  {activeStage.dateRange} · {activeStage.days.length} días
                </p>
              </div>
            </div>
          </div>

          {/* Days for active stage */}
          <div className="flex flex-col gap-2">
            {activeStage.days.map((day) => (
              <DayCard
                key={day.id}
                day={day}
                stageColor={activeStage.color}
                onUpdate={(updated) => handleUpdateDay(activeStage.id, updated)}
                defaultOpen={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}