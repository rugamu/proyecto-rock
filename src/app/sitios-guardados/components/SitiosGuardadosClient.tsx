'use client';

import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Check, Trash2, Bookmark } from 'lucide-react';

type PlaceType = 'restaurante' | 'playa' | 'punto_interes' | 'bar' | 'tienda' | 'otro';
type Destination = 'eubea' | 'nauplia' | 'kalamata' | 'lefkada' | 'milan' | 'general';

interface SavedPlace {
  id: string;
  name: string;
  type: PlaceType;
  destination: Destination;
  notes: string;
  visited: boolean;
}

const PLACE_TYPE_LABELS: Record<PlaceType, string> = {
  restaurante: '🍽️ Restaurante',
  playa: '🏖️ Playa',
  punto_interes: '🏛️ Punto de interés',
  bar: '🍹 Bar / Café',
  tienda: '🛍️ Tienda',
  otro: '📍 Otro',
};

const DESTINATION_LABELS: Record<Destination, string> = {
  eubea: '🏖️ Eubea',
  nauplia: '🏛️ Nauplia',
  kalamata: '🫒 Kalamata',
  lefkada: '⛵ Lefkada',
  milan: '🏙️ Milán',
  general: '🌍 General',
};

const DESTINATION_COLORS: Record<Destination, string> = {
  eubea: '#1e3a5f',
  nauplia: '#0f7b4e',
  kalamata: '#c1440e',
  lefkada: '#0e6b8f',
  milan: '#7c3aed',
  general: '#6b7a8d',
};

const STORAGE_KEY = 'sitios_guardados_v2';

const EMPTY_FORM: Omit<SavedPlace, 'id' | 'visited'> = {
  name: '',
  type: 'restaurante',
  destination: 'general',
  notes: '',
};

export default function SitiosGuardadosClient() {
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [filterDest, setFilterDest] = useState<Destination | 'todos'>('todos');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPlaces(JSON.parse(stored));
    } catch {}
  }, []);

  const savePlaces = (data: SavedPlace[]) => {
    setPlaces(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addPlace = () => {
    if (!form.name.trim()) return;
    const newPlace: SavedPlace = {
      id: `place-${Date.now()}`,
      ...form,
      visited: false,
    };
    savePlaces([...places, newPlace]);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
  };

  const toggleVisited = (id: string) => {
    savePlaces(places.map((p) => (p.id === id ? { ...p, visited: !p.visited } : p)));
  };

  const deletePlace = (id: string) => {
    savePlaces(places.filter((p) => p.id !== id));
  };

  const filtered = filterDest === 'todos' ? places : places.filter((p) => p.destination === filterDest);
  const destinations = (['todos', 'eubea', 'nauplia', 'kalamata', 'lefkada', 'milan', 'general'] as const);

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-safe-top"
        style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-lg mx-auto py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bookmark size={20} style={{ color: 'var(--primary)' }} />
              <h1 className="text-lg font-700" style={{ color: 'var(--foreground)' }}>
                Sitios Guardados
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              <Plus size={14} />
              Añadir sitio
            </button>
          </div>

          {/* Destination filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setFilterDest(dest)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-500 transition-all duration-150"
                style={{
                  background:
                    filterDest === dest
                      ? dest === 'todos'
                        ? 'var(--primary)'
                        : DESTINATION_COLORS[dest as Destination]
                      : 'var(--muted)',
                  color: filterDest === dest ? '#fff' : 'var(--muted-foreground)',
                }}
              >
                {dest === 'todos' ? '🌍 Todos' : DESTINATION_LABELS[dest as Destination]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {/* Add form */}
        {showForm && (
          <div
            className="rounded-2xl p-4 space-y-3"
            style={{ background: 'var(--card)', border: '2px solid var(--primary)' }}
          >
            <h3 className="font-600 text-sm" style={{ color: 'var(--foreground)' }}>
              Nuevo sitio
            </h3>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nombre del sitio *"
              className="input-field text-sm w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as PlaceType })}
                className="input-field text-sm"
              >
                {(Object.keys(PLACE_TYPE_LABELS) as PlaceType[]).map((t) => (
                  <option key={t} value={t}>{PLACE_TYPE_LABELS[t]}</option>
                ))}
              </select>
              <select
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value as Destination })}
                className="input-field text-sm"
              >
                {(Object.keys(DESTINATION_LABELS) as Destination[]).map((d) => (
                  <option key={d} value={d}>{DESTINATION_LABELS[d]}</option>
                ))}
              </select>
            </div>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Notas (opcional)"
              className="input-field text-sm resize-none w-full"
              rows={2}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => { setShowForm(false); setForm({ ...EMPTY_FORM }); }}
                className="btn-ghost text-xs px-3 py-1.5"
              >
                Cancelar
              </button>
              <button onClick={addPlace} className="btn-primary text-xs px-3 py-1.5">
                Guardar sitio
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <MapPin size={40} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)', opacity: 0.4 }} />
            <p className="font-600 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {filterDest === 'todos' ?'Aún no hay sitios guardados'
                : `No hay sitios guardados en ${DESTINATION_LABELS[filterDest as Destination]}`}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
              Pulsa "Añadir sitio" para guardar restaurantes, playas y más
            </p>
          </div>
        )}

        {/* Places list */}
        {filtered.map((place) => (
          <div
            key={place.id}
            className="rounded-2xl p-4"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              opacity: place.visited ? 0.7 : 1,
            }}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleVisited(place.id)}
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-150"
                style={{
                  borderColor: place.visited
                    ? DESTINATION_COLORS[place.destination]
                    : 'var(--border)',
                  background: place.visited ? DESTINATION_COLORS[place.destination] : 'transparent',
                }}
                title={place.visited ? 'Marcar como pendiente' : 'Marcar como visitado'}
              >
                {place.visited && <Check size={12} color="#fff" strokeWidth={3} />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-600 text-sm"
                    style={{
                      color: 'var(--foreground)',
                      textDecoration: place.visited ? 'line-through' : 'none',
                    }}
                  >
                    {place.name}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-500"
                    style={{
                      background: `${DESTINATION_COLORS[place.destination]}18`,
                      color: DESTINATION_COLORS[place.destination],
                    }}
                  >
                    {DESTINATION_LABELS[place.destination]}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                  {PLACE_TYPE_LABELS[place.type]}
                  {place.visited && (
                    <span className="ml-2 font-600" style={{ color: '#0f7b4e' }}>✓ Visitado</span>
                  )}
                </p>
                {place.notes && (
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {place.notes}
                  </p>
                )}
              </div>

              <button
                onClick={() => deletePlace(place.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
              >
                <Trash2 size={14} style={{ color: 'var(--danger)' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
