'use client';

import React, { useState } from 'react';
import { ExternalLink, Edit2, Trash2, Check, X } from 'lucide-react';
import ActivityIcon, { activityTypeLabel } from './ActivityIcon';
import type { Activity, ActivityType } from '@/lib/tripData';

const ACTIVITY_TYPES: ActivityType[] = [
  'playa', 'cultura', 'traslado', 'gastronomia', 'snorkel',
  'excursion', 'kayak', 'barco', 'vuelo', 'libre',
];

interface ActivityCardProps {
  activity: Activity;
  onEdit: (updated: Activity) => void;
  onDelete: (id: string) => void;
}

export default function ActivityCard({ activity, onEdit, onDelete }: ActivityCardProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Activity>({ ...activity });

  const handleSave = () => {
    onEdit(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...activity });
    setEditing(false);
  };

  const mapsUrl = activity.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.mapsQuery)}`
    : null;

  if (editing) {
    return (
      <div
        className="rounded-xl p-3 border-2 animate-fade-in"
        style={{ borderColor: 'var(--primary)', background: 'rgba(30,58,95,0.04)' }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as ActivityType })}
              className="input-field text-xs flex-shrink-0"
              style={{ width: 'auto', minWidth: 110 }}
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={`type-opt-${t}`} value={t}>{activityTypeLabel(t)}</option>
              ))}
            </select>
            <input
              value={form.time || ''}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="Hora (opcional)"
              className="input-field text-xs"
            />
          </div>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Título de la actividad"
            className="input-field text-sm font-600"
          />
          <textarea
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Descripción (opcional)"
            className="input-field text-xs resize-none"
            rows={2}
          />
          <input
            value={form.mapsQuery || ''}
            onChange={(e) => setForm({ ...form, mapsQuery: e.target.value })}
            placeholder="Búsqueda Google Maps (ej: Acrocorinto Grecia)"
            className="input-field text-xs"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={handleCancel} className="btn-ghost text-xs px-3 py-1.5">
              <X size={13} /> Cancelar
            </button>
            <button onClick={handleSave} className="btn-primary text-xs px-3 py-1.5">
              <Check size={13} /> Guardar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 py-2 px-1 rounded-xl transition-all duration-150 group hover:bg-muted/60">
      <ActivityIcon type={activity.type} size={15} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          {activity.time && (
            <span className="text-xs font-600 tabular-nums" style={{ color: 'var(--muted-foreground)' }}>
              {activity.time}
            </span>
          )}
          <span
            className="text-xs badge"
            style={{
              background: 'rgba(107,122,141,0.1)',
              color: 'var(--muted-foreground)',
            }}
          >
            {activityTypeLabel(activity.type)}
          </span>
        </div>
        <p className="text-sm font-600 mt-0.5" style={{ color: 'var(--foreground)' }}>
          {activity.title}
        </p>
        {activity.description && (
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            {activity.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg transition-all duration-150 hover:bg-muted"
            title="Ver en Google Maps"
            aria-label={`Ver ${activity.title} en Google Maps`}
          >
            <ExternalLink size={14} style={{ color: 'var(--primary)' }} />
          </a>
        )}
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 rounded-lg transition-all duration-150 hover:bg-muted"
          title="Editar actividad"
          aria-label={`Editar ${activity.title}`}
        >
          <Edit2 size={14} style={{ color: 'var(--muted-foreground)' }} />
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="p-1.5 rounded-lg transition-all duration-150 hover:bg-red-50"
          title="Eliminar actividad"
          aria-label={`Eliminar ${activity.title}`}
        >
          <Trash2 size={14} style={{ color: 'var(--danger)' }} />
        </button>
      </div>
    </div>
  );
}