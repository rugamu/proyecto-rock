'use client';

import React, { useState, useEffect } from 'react';
import { Plane, Building2, Car, UtensilsCrossed, ChevronDown, ChevronUp, Plus, Trash2, Receipt, TrendingUp, Fuel, CreditCard,  } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


// ─── Types ───────────────────────────────────────────────────────────────────

interface FixedItem {
  id: string;
  label: string;
  amount: number;
  isFixed: boolean; // true = ya pagado, false = estimado
}

interface BudgetCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  estimated: number;
  fixedItems: FixedItem[];
  isFullyFixed: boolean; // categoría entera ya pagada (vuelos, alojamientos)
}

interface RealExpense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const LS_EXPENSES_KEY = 'viaje-griegos-expenses-v2';
const LS_TOLLS_KEY = 'viaje-griegos-tolls-v2';

// ─── Static budget data ───────────────────────────────────────────────────────

const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'cat-vuelos',
    name: 'Vuelos',
    icon: Plane,
    color: '#c1440e',
    bgColor: 'rgba(193,68,14,0.08)',
    estimated: 509.38,
    isFullyFixed: true,
    fixedItems: [
      { id: 'fl-1', label: 'Madrid → Atenas · Iberia · 22/08 · 20:00→00:40', amount: 183.14, isFixed: true },
      { id: 'fl-2', label: 'Atenas → Milán · Ryanair · 10/09 · 15:35→17:15', amount: 191.06, isFixed: true },
      { id: 'fl-3', label: 'Milán → Madrid · Iberia · 13/09 · 14:45→17:05', amount: 135.18, isFixed: true },
    ],
  },
  {
    id: 'cat-alojamientos',
    name: 'Alojamientos',
    icon: Building2,
    color: '#1e3a5f',
    bgColor: 'rgba(30,58,95,0.08)',
    estimated: 1651.17,
    isFullyFixed: true,
    fixedItems: [
      { id: 'aloj-1', label: 'Calcis, Eubea · 22–26 ago · 4 noches', amount: 275.53, isFixed: true },
      { id: 'aloj-2', label: 'La Casa de los Conejos, Nauplia · 26–31 ago · 5 noches', amount: 368.81, isFixed: true },
      { id: 'aloj-3', label: 'Airbnb Akrita 32, Kalamata · 31 ago–5 sep · 5 noches', amount: 367.83, isFixed: true },
      { id: 'aloj-4', label: 'Aeraki House, Lefkada · 5–10 sep · 5 noches', amount: 285.00, isFixed: true },
      { id: 'aloj-5', label: 'Apartamento Navigli, Milán · 10–13 sep · 3 noches', amount: 354.00, isFixed: true },
    ],
  },
  {
    id: 'cat-coche',
    name: 'Coche y Gasolina',
    icon: Car,
    color: '#0f7b4e',
    bgColor: 'rgba(15,123,78,0.08)',
    estimated: 950.00,
    isFullyFixed: false,
    fixedItems: [
      { id: 'car-1', label: 'Imperial Rental Cars · 19 días · FDW incluido', amount: 700.00, isFixed: true },
      { id: 'car-2', label: 'Gasolina estimada', amount: 250.00, isFixed: false },
    ],
  },
  {
    id: 'cat-manutencion',
    name: 'Manutención y Actividades',
    icon: UtensilsCrossed,
    color: '#b45309',
    bgColor: 'rgba(180,83,9,0.08)',
    estimated: 2640.00,
    isFullyFixed: false,
    fixedItems: [
      { id: 'mant-1', label: '€120/día × 22 días (estimado)', amount: 2640.00, isFixed: false },
    ],
  },
];

const TOTAL_ESTIMATED = 5750.55;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatEur(amount: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryCard({
  category,
  realSpent,
}: {
  category: BudgetCategory;
  realSpent: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = category.icon;

  // Fixed items already paid
  const fixedPaid = category.fixedItems.filter((i) => i.isFixed).reduce((a, i) => a + i.amount, 0);

  // For fully-fixed categories (vuelos, alojamientos): real = estimated
  // For coche: real = fixed part (700) only (gasolina is variable)
  // For manutención: real = variable expenses passed in
  let effectiveReal: number;
  if (category.isFullyFixed) {
    effectiveReal = category.estimated;
  } else if (category.id === 'cat-coche') {
    effectiveReal = fixedPaid; // €700 already paid; gasolina tracked separately
  } else {
    effectiveReal = realSpent;
  }

  const pct = Math.min((effectiveReal / category.estimated) * 100, 100);
  const deviation = effectiveReal - category.estimated;
  const isOver = deviation > 0;

  // Label for the right side of the bar
  const realLabel = category.isFullyFixed
    ? `${formatEur(effectiveReal)} pagado`
    : category.id === 'cat-coche'
    ? `${formatEur(fixedPaid)} pagado`
    : `${formatEur(effectiveReal)} gastado`;

  return (
    <div className="card overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 hover:bg-muted/30"
        aria-expanded={open}
      >
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{ background: category.bgColor }}
        >
          <Icon size={20} style={{ color: category.color }} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-600" style={{ color: 'var(--foreground)' }}>
              {category.name}
            </p>
            {(category.isFullyFixed || category.id === 'cat-coche') && (
              <span className="badge badge-green text-xs">
                {category.isFullyFixed ? '✓ Pagado' : '✓ Alquiler pagado'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: isOver ? 'var(--danger)' : category.color,
                }}
              />
            </div>
            <span className="text-xs tabular-nums font-600 flex-shrink-0" style={{ color: category.color }}>
              {realLabel}
            </span>
            <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>
              / {formatEur(category.estimated)}
            </span>
          </div>
        </div>
        {open ? (
          <ChevronUp size={16} style={{ color: 'var(--muted-foreground)' }} />
        ) : (
          <ChevronDown size={16} style={{ color: 'var(--muted-foreground)' }} />
        )}
      </button>

      {open && (
        <div
          className="px-4 pb-4 animate-slide-up"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="pt-3 flex flex-col gap-2">
            {category.fixedItems.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <div
                  className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: item.isFixed ? 'var(--success)' : 'var(--warning)' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: item.isFixed ? 'var(--success)' : 'var(--warning)' }}>
                    {item.isFixed ? '✓ Pagado' : '~ Estimado'}
                  </p>
                </div>
                <p className="text-sm font-700 tabular-nums flex-shrink-0" style={{ color: category.color }}>
                  {formatEur(item.amount)}
                </p>
              </div>
            ))}

            {/* Summary row */}
            <div
              className="mt-2 pt-2 flex items-center justify-between"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <div>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  Fijo pagado
                </p>
                <p className="text-sm font-700 tabular-nums" style={{ color: 'var(--success)' }}>
                  {formatEur(fixedPaid)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  Total categoría
                </p>
                <p className="text-sm font-700 tabular-nums" style={{ color: category.color }}>
                  {formatEur(category.estimated)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tolls tracker ────────────────────────────────────────────────────────────

interface TollEntry {
  id: string;
  date: string;
  location: string;
  amount: number;
}

function TollsTracker() {
  const [tolls, setTolls] = useState<TollEntry[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: '', location: '', amount: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_TOLLS_KEY);
      if (raw) setTolls(JSON.parse(raw));
    } catch { /* empty */ }
  }, []);

  const save = (updated: TollEntry[]) => {
    setTolls(updated);
    localStorage.setItem(LS_TOLLS_KEY, JSON.stringify(updated));
    // Backend integration: sync to Supabase here
  };

  const handleAdd = () => {
    if (!form.date || !form.location || !form.amount) return;
    const entry: TollEntry = {
      id: `toll-${Date.now()}`,
      date: form.date,
      location: form.location.trim(),
      amount: parseFloat(form.amount),
    };
    save([...tolls, entry]);
    setForm({ date: '', location: '', amount: '' });
    setAdding(false);
    toast.success('Peaje añadido');
  };

  const handleDelete = (id: string) => {
    save(tolls.filter((t) => t.id !== id));
    toast.success('Peaje eliminado');
  };

  const total = tolls.reduce((a, t) => a + t.amount, 0);

  return (
    <div className="card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-xl"
            style={{ background: 'rgba(107,122,141,0.12)' }}
          >
            <CreditCard size={16} style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-600" style={{ color: 'var(--foreground)' }}>Peajes</p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {tolls.length > 0 ? `${tolls.length} registrado${tolls.length > 1 ? 's' : ''} · ${formatEur(total)}` : 'Sin registros aún'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="btn-ghost text-xs px-2 py-1.5"
        >
          <Plus size={14} />
          Añadir
        </button>
      </div>

      {adding && (
        <div
          className="rounded-xl p-3 mb-3 animate-fade-in"
          style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="input-field text-sm"
            />
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Lugar / descripción"
              className="input-field text-sm"
            />
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Importe (€)"
              className="input-field text-sm"
              min="0"
              step="0.01"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setAdding(false)} className="btn-ghost text-xs px-3 py-1.5">Cancelar</button>
              <button onClick={handleAdd} className="btn-primary text-xs px-3 py-1.5">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {tolls.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {tolls.map((toll) => (
            <div key={toll.id} className="flex items-center gap-2 py-1.5 group">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-600" style={{ color: 'var(--foreground)' }}>{toll.location}</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{formatDate(toll.date)}</p>
              </div>
              <p className="text-sm font-700 tabular-nums" style={{ color: 'var(--foreground)' }}>
                {formatEur(toll.amount)}
              </p>
              <button
                onClick={() => handleDelete(toll.id)}
                className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar peaje"
              >
                <Trash2 size={13} style={{ color: 'var(--danger)' }} />
              </button>
            </div>
          ))}
          <div
            className="flex items-center justify-between pt-2 mt-1"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p className="text-xs font-600" style={{ color: 'var(--muted-foreground)' }}>Total peajes</p>
            <p className="text-sm font-700 tabular-nums" style={{ color: 'var(--foreground)' }}>{formatEur(total)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Real expenses list ───────────────────────────────────────────────────────

const EXPENSE_CATEGORIES = [
  'Gasolina', 'Restaurante', 'Supermercado', 'Actividad / Entrada',
  'Transporte', 'Souvenir', 'Farmacia', 'Otro',
];

function RealExpenses({ onTotalChange }: { onTotalChange: (total: number) => void }) {
  const [expenses, setExpenses] = useState<RealExpense[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: '', category: 'Restaurante', amount: '', description: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_EXPENSES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as RealExpense[];
        setExpenses(parsed);
        onTotalChange(parsed.reduce((a, e) => a + e.amount, 0));
      }
    } catch { /* empty */ }
  }, [onTotalChange]);

  const save = (updated: RealExpense[]) => {
    setExpenses(updated);
    const total = updated.reduce((a, e) => a + e.amount, 0);
    onTotalChange(total);
    localStorage.setItem(LS_EXPENSES_KEY, JSON.stringify(updated));
    // Backend integration: sync to Supabase here
  };

  const handleAdd = () => {
    if (!form.date || !form.amount) return;
    const expense: RealExpense = {
      id: `exp-${Date.now()}`,
      date: form.date,
      category: form.category,
      amount: parseFloat(form.amount),
      description: form.description.trim(),
    };
    save([expense, ...expenses]);
    setForm({ date: '', category: 'Restaurante', amount: '', description: '' });
    setAdding(false);
    toast.success(`Gasto de ${formatEur(expense.amount)} registrado`);
  };

  const handleDelete = (id: string) => {
    save(expenses.filter((e) => e.id !== id));
    toast.success('Gasto eliminado');
  };

  const variableTotal = expenses.reduce((a, e) => a + e.amount, 0);

  return (
    <div className="card overflow-hidden">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Receipt size={18} style={{ color: 'var(--primary)' }} />
            <p className="text-base font-700" style={{ color: 'var(--foreground)' }}>Gastos reales</p>
          </div>
          <button
            onClick={() => setAdding(!adding)}
            className="btn-primary text-xs px-3 py-1.5"
          >
            <Plus size={14} /> Añadir gasto
          </button>
        </div>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Registra gastos variables durante el viaje
        </p>
      </div>

      {adding && (
        <div
          className="mx-4 mb-4 rounded-xl p-3 animate-fade-in"
          style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs font-600 mb-2" style={{ color: 'var(--primary)' }}>Nuevo gasto</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-field text-sm flex-1"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field text-sm flex-1"
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={`exp-cat-${c}`} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Importe (€)"
              className="input-field text-sm"
              min="0"
              step="0.01"
            />
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descripción (opcional)"
              className="input-field text-sm"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setAdding(false)} className="btn-ghost text-xs px-3 py-1.5">
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                disabled={!form.date || !form.amount}
                className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {expenses.length === 0 ? (
        <div className="px-4 pb-4 flex flex-col items-center py-6 text-center">
          <Receipt size={32} style={{ color: 'var(--border)' }} />
          <p className="text-sm font-600 mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Sin gastos registrados aún
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Añade gastos durante el viaje para controlar la desviación
          </p>
        </div>
      ) : (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center gap-3 px-4 py-3 group hover:bg-muted/40 transition-all duration-150"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="badge badge-blue text-xs">{expense.category}</span>
                  <span className="text-xs tabular-nums" style={{ color: 'var(--muted-foreground)' }}>
                    {formatDate(expense.date)}
                  </span>
                </div>
                {expense.description && (
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--foreground)' }}>
                    {expense.description}
                  </p>
                )}
              </div>
              <p className="text-sm font-700 tabular-nums flex-shrink-0" style={{ color: 'var(--foreground)' }}>
                {formatEur(expense.amount)}
              </p>
              <button
                onClick={() => handleDelete(expense.id)}
                className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar gasto"
              >
                <Trash2 size={14} style={{ color: 'var(--danger)' }} />
              </button>
            </div>
          ))}
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-xs font-600" style={{ color: 'var(--muted-foreground)' }}>
              Total gastos variables
            </p>
            <p className="text-base font-700 tabular-nums" style={{ color: 'var(--foreground)' }}>
              {formatEur(variableTotal)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PresupuestoClient() {
  const [variableSpent, setVariableSpent] = useState(0);

  // Fixed costs already paid
  const fixedPaid = BUDGET_CATEGORIES.filter((c) => c.isFullyFixed).reduce(
    (a, c) => a + c.estimated,
    0
  );
  // Car fixed part
  const carFixed = BUDGET_CATEGORIES.find((c) => c.id === 'cat-coche')
    ?.fixedItems.filter((i) => i.isFixed).reduce((a, i) => a + i.amount, 0) ?? 0;

  const totalRealSpent = fixedPaid + carFixed + variableSpent;
  const remaining = TOTAL_ESTIMATED - totalRealSpent;
  const deviation = totalRealSpent - (fixedPaid + carFixed); // vs variable estimated
  const overallPct = Math.min((totalRealSpent / TOTAL_ESTIMATED) * 100, 100);

  return (
    <div className="px-4 pb-4">
      <Toaster position="bottom-center" richColors />

      {/* Hero KPI */}
      <div
        className="rounded-2xl p-4 mb-4 card-shadow-md"
        style={{ background: 'var(--primary)' }}
      >
        <p className="text-xs font-600 text-white/70 uppercase tracking-wide mb-1">
          Presupuesto total estimado
        </p>
        <p className="text-3xl font-700 tabular-nums text-white mb-3">
          {formatEur(TOTAL_ESTIMATED)}
        </p>
        <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%`, background: 'white' }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">Gastado / comprometido</p>
            <p className="text-lg font-700 tabular-nums text-white">{formatEur(totalRealSpent)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">Disponible estimado</p>
            <p
              className="text-lg font-700 tabular-nums"
              style={{ color: remaining >= 0 ? '#86efac' : '#fca5a5' }}
            >
              {formatEur(remaining)}
            </p>
          </div>
        </div>
      </div>

      {/* Mini KPI row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} style={{ color: 'var(--success)' }} />
            <p className="text-xs font-600" style={{ color: 'var(--muted-foreground)' }}>Ya pagado (fijo)</p>
          </div>
          <p className="text-base font-700 tabular-nums" style={{ color: 'var(--success)' }}>
            {formatEur(fixedPaid + carFixed)}
          </p>
        </div>
        <div className="card p-3">
          <div className="flex items-center gap-2 mb-1">
            <Fuel size={14} style={{ color: 'var(--warning)' }} />
            <p className="text-xs font-600" style={{ color: 'var(--muted-foreground)' }}>Variable estimado</p>
          </div>
          <p className="text-base font-700 tabular-nums" style={{ color: 'var(--warning)' }}>
            {formatEur(2640 + 250)}
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      <p className="text-sm font-700 mb-3" style={{ color: 'var(--foreground)' }}>
        Desglose por categoría
      </p>
      {BUDGET_CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          realSpent={variableSpent}
        />
      ))}

      {/* Tolls */}
      <p className="text-sm font-700 mb-3 mt-2" style={{ color: 'var(--foreground)' }}>
        Peajes
      </p>
      <TollsTracker />

      {/* Real expenses */}
      <p className="text-sm font-700 mb-3" style={{ color: 'var(--foreground)' }}>
        Gastos variables durante el viaje
      </p>
      <RealExpenses onTotalChange={setVariableSpent} />

      {/* Total gasto real acumulado */}
      <div
        className="rounded-2xl p-4 mt-4 mb-2"
        style={{ background: 'var(--primary)' }}
      >
        <p className="text-xs font-600 text-white/70 uppercase tracking-wide mb-3">
          Resumen gasto real acumulado
        </p>
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80">✈️ Vuelos (pagados)</span>
            <span className="text-sm font-700 tabular-nums text-white">{formatEur(509.38)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80">🏠 Alojamientos (pagados)</span>
            <span className="text-sm font-700 tabular-nums text-white">{formatEur(1651.17)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80">🚗 Alquiler coche (pagado)</span>
            <span className="text-sm font-700 tabular-nums text-white">{formatEur(700.00)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80">📋 Gastos variables registrados</span>
            <span className="text-sm font-700 tabular-nums text-white">{formatEur(variableSpent)}</span>
          </div>
        </div>
        <div
          className="pt-3 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.25)' }}
        >
          <div>
            <p className="text-xs text-white/70">Total gastado / comprometido</p>
            <p className="text-2xl font-700 tabular-nums text-white">{formatEur(totalRealSpent)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">Pendiente estimado</p>
            <p
              className="text-xl font-700 tabular-nums"
              style={{ color: remaining >= 0 ? '#86efac' : '#fca5a5' }}
            >
              {formatEur(remaining)}
            </p>
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%`, background: 'white' }}
          />
        </div>
        <p className="text-xs text-white/60 mt-1 text-right">
          {overallPct.toFixed(0)}% del presupuesto total
        </p>
      </div>
    </div>
  );
}