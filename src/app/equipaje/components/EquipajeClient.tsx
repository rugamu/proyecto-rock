'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Luggage, User } from 'lucide-react';

interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
  custom?: boolean;
}

interface PackingCategory {
  id: string;
  name: string;
  emoji: string;
  items: PackingItem[];
}

interface TravelerPacking {
  traveler: 'virginia' | 'ruben';
  categories: PackingCategory[];
}

const DEFAULT_VIRGINIA: PackingCategory[] = [
  {
    id: 'ropa-v',
    name: 'Ropa',
    emoji: '👗',
    items: [
      { id: 'v-r1', name: 'Bañadores (3)', packed: false },
      { id: 'v-r2', name: 'Vestidos de verano (4)', packed: false },
      { id: 'v-r3', name: 'Shorts (2)', packed: false },
      { id: 'v-r4', name: 'Camisetas (5)', packed: false },
      { id: 'v-r5', name: 'Ropa interior (7)', packed: false },
      { id: 'v-r6', name: 'Calcetines (5 pares)', packed: false },
      { id: 'v-r7', name: 'Sujetadores (3)', packed: false },
      { id: 'v-r8', name: 'Chaqueta ligera / cárdigan', packed: false },
      { id: 'v-r9', name: 'Pijama', packed: false },
      { id: 'v-r10', name: 'Pareo / toalla playa', packed: false },
      { id: 'v-r11', name: 'Sandalias', packed: false },
      { id: 'v-r12', name: 'Zapatillas cómodas', packed: false },
      { id: 'v-r13', name: 'Chanclas', packed: false },
    ],
  },
  {
    id: 'higiene-v',
    name: 'Higiene y belleza',
    emoji: '🧴',
    items: [
      { id: 'v-h1', name: 'Champú y acondicionador (formato viaje)', packed: false },
      { id: 'v-h2', name: 'Gel de ducha', packed: false },
      { id: 'v-h3', name: 'Desodorante', packed: false },
      { id: 'v-h4', name: 'Crema solar SPF50', packed: false },
      { id: 'v-h5', name: 'After sun', packed: false },
      { id: 'v-h6', name: 'Maquillaje básico', packed: false },
      { id: 'v-h7', name: 'Desmaquillante', packed: false },
      { id: 'v-h8', name: 'Cepillo de dientes y pasta', packed: false },
      { id: 'v-h9', name: 'Hilo dental', packed: false },
      { id: 'v-h10', name: 'Cepillo / peine', packed: false },
      { id: 'v-h11', name: 'Productos menstruales', packed: false },
      { id: 'v-h12', name: 'Crema hidratante', packed: false },
      { id: 'v-h13', name: 'Perfume (formato viaje)', packed: false },
    ],
  },
  {
    id: 'docs-v',
    name: 'Documentación',
    emoji: '📄',
    items: [
      { id: 'v-d1', name: 'DNI / Pasaporte', packed: false },
      { id: 'v-d2', name: 'Tarjeta sanitaria europea', packed: false },
      { id: 'v-d3', name: 'Tarjeta de crédito / débito', packed: false },
      { id: 'v-d4', name: 'Confirmaciones de vuelos (impreso o móvil)', packed: false },
      { id: 'v-d5', name: 'Confirmaciones de alojamientos', packed: false },
    ],
  },
  {
    id: 'electronica-v',
    name: 'Electrónica',
    emoji: '🔌',
    items: [
      { id: 'v-e1', name: 'Móvil + cargador', packed: false },
      { id: 'v-e2', name: 'Auriculares', packed: false },
      { id: 'v-e3', name: 'Power bank', packed: false },
      { id: 'v-e4', name: 'Adaptador de enchufe (Grecia tipo F)', packed: false },
    ],
  },
  {
    id: 'medicacion-v',
    name: 'Medicación y salud',
    emoji: '💊',
    items: [
      { id: 'v-m1', name: 'Medicación habitual', packed: false },
      { id: 'v-m2', name: 'Ibuprofeno / paracetamol', packed: false },
      { id: 'v-m3', name: 'Antihistamínico', packed: false },
      { id: 'v-m4', name: 'Protector solar labial', packed: false },
      { id: 'v-m5', name: 'Tiritas y desinfectante', packed: false },
      { id: 'v-m6', name: 'Pastillas para el mareo', packed: false },
    ],
  },
];

const DEFAULT_RUBEN: PackingCategory[] = [
  {
    id: 'ropa-r',
    name: 'Ropa',
    emoji: '👕',
    items: [
      { id: 'r-r1', name: 'Bañadores (3)', packed: false },
      { id: 'r-r2', name: 'Camisetas (6)', packed: false },
      { id: 'r-r3', name: 'Shorts (3)', packed: false },
      { id: 'r-r4', name: 'Ropa interior (7)', packed: false },
      { id: 'r-r5', name: 'Calcetines (5 pares)', packed: false },
      { id: 'r-r6', name: 'Calcetines de deporte (2 pares)', packed: false },
      { id: 'r-r7', name: 'Camisa para salir (1)', packed: false },
      { id: 'r-r8', name: 'Pantalón largo ligero', packed: false },
      { id: 'r-r9', name: 'Chaqueta ligera', packed: false },
      { id: 'r-r10', name: 'Pijama', packed: false },
      { id: 'r-r11', name: 'Toalla de playa', packed: false },
      { id: 'r-r12', name: 'Sandalias', packed: false },
      { id: 'r-r13', name: 'Zapatillas cómodas', packed: false },
      { id: 'r-r14', name: 'Chanclas', packed: false },
    ],
  },
  {
    id: 'higiene-r',
    name: 'Higiene',
    emoji: '🧴',
    items: [
      { id: 'r-h1', name: 'Champú (formato viaje)', packed: false },
      { id: 'r-h2', name: 'Gel de ducha', packed: false },
      { id: 'r-h3', name: 'Desodorante', packed: false },
      { id: 'r-h4', name: 'Crema solar SPF50', packed: false },
      { id: 'r-h5', name: 'After sun', packed: false },
      { id: 'r-h6', name: 'Cepillo de dientes y pasta', packed: false },
      { id: 'r-h7', name: 'Hilo dental', packed: false },
      { id: 'r-h8', name: 'Maquinilla de afeitar / recortadora', packed: false },
      { id: 'r-h9', name: 'Crema hidratante', packed: false },
    ],
  },
  {
    id: 'docs-r',
    name: 'Documentación',
    emoji: '📄',
    items: [
      { id: 'r-d1', name: 'DNI / Pasaporte', packed: false },
      { id: 'r-d2', name: 'Tarjeta sanitaria europea', packed: false },
      { id: 'r-d3', name: 'Tarjeta de crédito / débito', packed: false },
      { id: 'r-d4', name: 'Carnet de conducir', packed: false },
      { id: 'r-d5', name: 'Confirmaciones de vuelos (impreso o móvil)', packed: false },
      { id: 'r-d6', name: 'Confirmaciones de alojamientos', packed: false },
      { id: 'r-d7', name: 'Documentación del coche de alquiler', packed: false },
    ],
  },
  {
    id: 'electronica-r',
    name: 'Electrónica',
    emoji: '🔌',
    items: [
      { id: 'r-e1', name: 'Móvil + cargador', packed: false },
      { id: 'r-e2', name: 'Auriculares', packed: false },
      { id: 'r-e3', name: 'Power bank', packed: false },
      { id: 'r-e4', name: 'Adaptador de enchufe (Grecia tipo F)', packed: false },
      { id: 'r-e5', name: 'Cámara de fotos + cargador', packed: false },
    ],
  },
  {
    id: 'medicacion-r',
    name: 'Medicación y salud',
    emoji: '💊',
    items: [
      { id: 'r-m1', name: 'Medicación habitual', packed: false },
      { id: 'r-m2', name: 'Ibuprofeno / paracetamol', packed: false },
      { id: 'r-m3', name: 'Antihistamínico', packed: false },
      { id: 'r-m4', name: 'Protector solar labial', packed: false },
      { id: 'r-m5', name: 'Tiritas y desinfectante', packed: false },
      { id: 'r-m6', name: 'Pastillas para el mareo', packed: false },
    ],
  },
];

const STORAGE_KEY_V = 'equipaje_virginia_v2';
const STORAGE_KEY_R = 'equipaje_ruben_v2';

export default function EquipajeClient() {
  const [activeTab, setActiveTab] = useState<'virginia' | 'ruben'>('virginia');
  const [virginiaData, setVirginiaData] = useState<PackingCategory[]>(DEFAULT_VIRGINIA);
  const [rubenData, setRubenData] = useState<PackingCategory[]>(DEFAULT_RUBEN);
  const [newItemText, setNewItemText] = useState('');
  const [addingTo, setAddingTo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sv = localStorage.getItem(STORAGE_KEY_V);
      if (sv) setVirginiaData(JSON.parse(sv));
      const sr = localStorage.getItem(STORAGE_KEY_R);
      if (sr) setRubenData(JSON.parse(sr));
    } catch {}
  }, []);

  const saveVirginia = (data: PackingCategory[]) => {
    setVirginiaData(data);
    localStorage.setItem(STORAGE_KEY_V, JSON.stringify(data));
  };

  const saveRuben = (data: PackingCategory[]) => {
    setRubenData(data);
    localStorage.setItem(STORAGE_KEY_R, JSON.stringify(data));
  };

  const currentData = activeTab === 'virginia' ? virginiaData : rubenData;
  const saveData = activeTab === 'virginia' ? saveVirginia : saveRuben;

  const toggleItem = (catId: string, itemId: string) => {
    const updated = currentData.map((cat) =>
      cat.id === catId
        ? {
            ...cat,
            items: cat.items.map((item) =>
              item.id === itemId ? { ...item, packed: !item.packed } : item
            ),
          }
        : cat
    );
    saveData(updated);
  };

  const deleteItem = (catId: string, itemId: string) => {
    const updated = currentData.map((cat) =>
      cat.id === catId
        ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
        : cat
    );
    saveData(updated);
  };

  const addItem = (catId: string) => {
    if (!newItemText.trim()) return;
    const updated = currentData.map((cat) =>
      cat.id === catId
        ? {
            ...cat,
            items: [
              ...cat.items,
              {
                id: `custom-${Date.now()}`,
                name: newItemText.trim(),
                packed: false,
                custom: true,
              },
            ],
          }
        : cat
    );
    saveData(updated);
    setNewItemText('');
    setAddingTo(null);
  };

  const totalItems = currentData.reduce((acc, cat) => acc + cat.items.length, 0);
  const packedItems = currentData.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.packed).length,
    0
  );
  const progress = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  const travelerColor = activeTab === 'virginia' ? '#c1440e' : '#1e3a5f';
  const travelerLabel = activeTab === 'virginia' ? 'Virginia' : 'Rubén';

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-safe-top"
        style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-lg mx-auto py-3">
          <div className="flex items-center gap-2 mb-3">
            <Luggage size={20} style={{ color: 'var(--primary)' }} />
            <h1 className="text-lg font-700" style={{ color: 'var(--foreground)' }}>
              Equipaje — Maleta de cabina
            </h1>
          </div>

          {/* Traveler tabs */}
          <div className="flex gap-2 mb-3">
            {(['virginia', 'ruben'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-600 transition-all duration-150"
                style={{
                  background: activeTab === t ? travelerColor : 'var(--muted)',
                  color: activeTab === t ? '#fff' : 'var(--muted-foreground)',
                }}
              >
                <User size={14} />
                {t === 'virginia' ? 'Virginia' : 'Rubén'}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: travelerColor }}
              />
            </div>
            <span className="text-xs font-600 tabular-nums" style={{ color: 'var(--muted-foreground)' }}>
              {packedItems}/{totalItems} ({progress}%)
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {currentData.map((cat) => {
          const catPacked = cat.items.filter((i) => i.packed).length;
          const catTotal = cat.items.length;
          return (
            <div
              key={cat.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="font-600 text-sm" style={{ color: 'var(--foreground)' }}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                  {catPacked}/{catTotal}
                </span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {cat.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                    <button
                      onClick={() => toggleItem(cat.id, item.id)}
                      className="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150"
                      style={{
                        borderColor: item.packed ? travelerColor : 'var(--border)',
                        background: item.packed ? travelerColor : 'transparent',
                      }}
                    >
                      {item.packed && <Check size={11} color="#fff" strokeWidth={3} />}
                    </button>
                    <span
                      className="flex-1 text-sm transition-all duration-150"
                      style={{
                        color: item.packed ? 'var(--muted-foreground)' : 'var(--foreground)',
                        textDecoration: item.packed ? 'line-through' : 'none',
                      }}
                    >
                      {item.name}
                    </span>
                    {item.custom && (
                      <button
                        onClick={() => deleteItem(cat.id, item.id)}
                        className="p-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={13} style={{ color: 'var(--danger)' }} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add item */}
              <div className="px-4 py-2" style={{ borderTop: '1px solid var(--border)' }}>
                {addingTo === cat.id ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addItem(cat.id);
                        if (e.key === 'Escape') { setAddingTo(null); setNewItemText(''); }
                      }}
                      placeholder="Nombre del artículo..."
                      className="input-field text-sm flex-1"
                    />
                    <button
                      onClick={() => addItem(cat.id)}
                      className="btn-primary text-xs px-3 py-1.5"
                    >
                      Añadir
                    </button>
                    <button
                      onClick={() => { setAddingTo(null); setNewItemText(''); }}
                      className="btn-ghost text-xs px-3 py-1.5"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingTo(cat.id)}
                    className="flex items-center gap-1.5 text-xs py-1 transition-colors"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <Plus size={13} />
                    Añadir artículo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
