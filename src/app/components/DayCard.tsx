'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, StickyNote } from 'lucide-react';
import ActivityCard from './ActivityCard';
import type { TripDay, Activity, ActivityType } from '@/lib/tripData';

const ACTIVITY_TYPES: ActivityType[] = [
  'playa', 'cultura', 'traslado', 'gastronomia', 'snorkel',
  'excursion', 'kayak', 'barco', 'vuelo', 'libre',
];

const activityTypeLabel = (t: ActivityType) => {
  const labels: Record<ActivityType, string> = {
    playa: 'Playa', cultura: 'Cultura', traslado: 'Traslado',
    gastronomia: 'Gastronomía', snorkel: 'Snorkel', excursion: 'Excursión',
    kayak: 'Kayak', barco: 'Barco', vuelo: 'Vuelo', libre: 'Libre',
  };
  return labels[t] || t;
};

interface DayCardProps {
  day: TripDay;
  stageColor: string;
  onUpdate: (updated: TripDay) => void;
  defaultOpen?: boolean;
}

export default function DayCard({ day, stageColor, onUpdate, defaultOpen = false }: DayCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(day.notes);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    type: 'libre',
    title: '',
    description: '',
    time: '',
    mapsQuery: '',
  });

  const handleNotesSave = () => {
    onUpdate({ ...day, notes: notesValue });
    setEditingNotes(false);
  };

  const handleAddActivity = () => {
    if (!newActivity.title?.trim()) return;
    const act: Activity = {
      id: `act-custom-${Date.now()}`,
      type: newActivity.type as ActivityType || 'libre',
      title: newActivity.title.trim(),
      description: newActivity.description || undefined,
      time: newActivity.time || undefined,
      mapsQuery: newActivity.mapsQuery || undefined,
    };
    onUpdate({ ...day, activities: [...day.activities, act] });
    setNewActivity({ type: 'libre', title: '', description: '', time: '', mapsQuery: '' });
    setShowAddActivity(false);
  };

  const handleEditActivity = (updated: Activity) => {
    onUpdate({
      ...day,
      activities: day.activities.map((a) => (a.id === updated.id ? updated : a)),
    });
  };

  const handleDeleteActivity = (id: string) => {
    onUpdate({ ...day, activities: day.activities.filter((a) => a.id !== id) });
  };

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 hover:bg-muted/40"
        aria-expanded={open}
      >
        <div
          className="w-1.5 h-10 rounded-full flex-shrink-0"
          style={{ background: stageColor }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-700" style={{ color: 'var(--foreground)' }}>
            {day.label}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {day.activities.length} {day.activities.length === 1 ? 'actividad' : 'actividades'}
            {day.notes && ' · 📝 Notas'}
          </p>
        </div>
        {open ? (
          <ChevronUp size={18} style={{ color: 'var(--muted-foreground)' }} />
        ) : (
          <ChevronDown size={18} style={{ color: 'var(--muted-foreground)' }} />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="border-t pt-3 mb-3" style={{ borderColor: 'var(--border)' }}>
            <div className="flex flex-col gap-1">
              {day.activities.map((act) => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  onEdit={handleEditActivity}
                  onDelete={handleDeleteActivity}
                />
              ))}
            </div>
          </div>

          {/* Add Activity */}
          {showAddActivity ? (
            <div
              className="rounded-xl p-3 mb-3 border animate-fade-in"
              style={{ background: 'rgba(30,58,95,0.03)', borderColor: 'var(--border)' }}
            >
              <p className="text-xs font-600 mb-2" style={{ color: 'var(--primary)' }}>
                Nueva actividad
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <select
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as ActivityType })}
                    className="input-field text-xs"
                    style={{ flex: '0 0 auto', minWidth: 110 }}
                  >
                    {ACTIVITY_TYPES.map((t) => (
                      <option key={`new-type-${t}`} value={t}>{activityTypeLabel(t)}</option>
                    ))}
                  </select>
                  <input
                    value={newActivity.time || ''}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    placeholder="Hora"
                    className="input-field text-xs"
                  />
                </div>
                <input
                  value={newActivity.title || ''}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="Título *"
                  className="input-field text-sm"
                />
                <textarea
                  value={newActivity.description || ''}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="Descripción (opcional)"
                  className="input-field text-xs resize-none"
                  rows={2}
                />
                <input
                  value={newActivity.mapsQuery || ''}
                  onChange={(e) => setNewActivity({ ...newActivity, mapsQuery: e.target.value })}
                  placeholder="Búsqueda Google Maps"
                  className="input-field text-xs"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowAddActivity(false)}
                    className="btn-ghost text-xs px-3 py-1.5"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddActivity}
                    disabled={!newActivity.title?.trim()}
                    className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50"
                  >
                    <Plus size={13} /> Añadir
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddActivity(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed text-xs font-500 transition-all duration-150 hover:bg-muted/60 mb-3"
              style={{ borderColor: stageColor, color: stageColor }}
            >
              <Plus size={14} />
              Añadir actividad
            </button>
          )}

          {/* Notes */}
          <div
            className="rounded-xl p-3"
            style={{ background: 'rgba(245,230,211,0.5)', border: '1px solid rgba(193,68,14,0.15)' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <StickyNote size={13} style={{ color: 'var(--secondary)' }} />
              <span className="text-xs font-600" style={{ color: 'var(--secondary)' }}>
                Notas del día
              </span>
            </div>
            {editingNotes ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  placeholder="Añade notas para este día..."
                  className="input-field text-xs resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => { setNotesValue(day.notes); setEditingNotes(false); }}
                    className="btn-ghost text-xs px-3 py-1.5"
                  >
                    Cancelar
                  </button>
                  <button onClick={handleNotesSave} className="btn-primary text-xs px-3 py-1.5">
                    Guardar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditingNotes(true)}
                className="w-full text-left text-xs transition-all duration-150 hover:opacity-80"
                style={{ color: notesValue ? 'var(--foreground)' : 'var(--muted-foreground)' }}
              >
                {notesValue || 'Toca para añadir notas...'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}