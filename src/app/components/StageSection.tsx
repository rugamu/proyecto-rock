'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DayCard from './DayCard';
import type { TripStage, TripDay } from '@/lib/tripData';

interface StageSectionProps {
  stage: TripStage;
  onUpdateDay: (stageId: string, updatedDay: TripDay) => void;
}

export default function StageSection({ stage, onUpdateDay }: StageSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-2 transition-all duration-150 active:scale-[0.99]"
        style={{ background: stage.bgColor, border: `1.5px solid ${stage.color}30` }}
        aria-expanded={open}
      >
        <span className="text-xl leading-none">{stage.emoji}</span>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-700" style={{ color: stage.color }}>
            {stage.name} — {stage.subtitle}
          </p>
          <p className="text-xs" style={{ color: stage.color, opacity: 0.75 }}>
            {stage.dateRange} · {stage.days.length} días
          </p>
        </div>
        {open ? (
          <ChevronUp size={18} style={{ color: stage.color }} />
        ) : (
          <ChevronDown size={18} style={{ color: stage.color }} />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-2 pl-2 animate-slide-up">
          {stage.days.map((day) => (
            <DayCard
              key={day.id}
              day={day}
              stageColor={stage.color}
              onUpdate={(updated) => onUpdateDay(stage.id, updated)}
              defaultOpen={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}