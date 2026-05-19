export type ActivityType =
  | 'playa' |'cultura' |'traslado' |'gastronomia' |'snorkel' |'excursion' |'kayak' |'barco' |'vuelo' |'libre';

export interface Activity {
  id: string;
  time?: string;
  type: ActivityType;
  title: string;
  description?: string;
  mapsQuery?: string;
}

export interface TripDay {
  id: string;
  date: string; // YYYY-MM-DD
  label: string; // "Lun 22 ago"
  notes: string;
  activities: Activity[];
}

export interface TripStage {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
  emoji: string;
  dateRange: string;
  days: TripDay[];
}

export const TRIP_STAGES: TripStage[] = [
  {
    id: 'stage-eubea',
    name: 'Eubea',
    subtitle: 'Base Calcis',
    color: '#1e3a5f',
    bgColor: 'rgba(30,58,95,0.08)',
    emoji: '🏖️',
    dateRange: '22–26 ago',
    days: [
      {
        id: 'day-2026-08-22',
        date: '2026-08-22',
        label: 'Sáb 22 ago',
        notes: '',
        activities: [
          {
            id: 'act-0822-1',
            time: '20:00',
            type: 'vuelo',
            title: 'Vuelo Madrid → Atenas',
            description: 'Iberia · Salida 20:00 · Llegada 00:40',
            mapsQuery: 'Aeropuerto Adolfo Suárez Madrid-Barajas',
          },
          {
            id: 'act-0822-2',
            time: '00:40',
            type: 'traslado',
            title: 'Llegada a Atenas y traslado a Calcis',
            description: 'Recogida de maletas y traslado nocturno a Eubea (~1.5h)',
            mapsQuery: 'Calcis Eubea Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-23',
        date: '2026-08-23',
        label: 'Dom 23 ago',
        notes: '',
        activities: [
          {
            id: 'act-0823-1',
            type: 'libre',
            title: 'Día libre en Eubea',
            description: 'Sin planificación — explorar a tu ritmo',
            mapsQuery: 'Calcis Eubea Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-24',
        date: '2026-08-24',
        label: 'Lun 24 ago',
        notes: '',
        activities: [
          {
            id: 'act-0824-1',
            type: 'libre',
            title: 'Día libre en Eubea',
            description: 'Sin planificación — explorar a tu ritmo',
            mapsQuery: 'Eubea Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-25',
        date: '2026-08-25',
        label: 'Mar 25 ago',
        notes: '',
        activities: [
          {
            id: 'act-0825-1',
            type: 'libre',
            title: 'Día libre en Eubea',
            description: 'Sin planificación — explorar a tu ritmo',
            mapsQuery: 'Eubea Grecia',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-nauplia',
    name: 'Peloponeso',
    subtitle: 'Base Nauplia',
    color: '#0f7b4e',
    bgColor: 'rgba(15,123,78,0.08)',
    emoji: '🏛️',
    dateRange: '26–31 ago',
    days: [
      {
        id: 'day-2026-08-26',
        date: '2026-08-26',
        label: 'Mié 26 ago',
        notes: '',
        activities: [
          {
            id: 'act-0826-1',
            time: 'Mañana',
            type: 'traslado',
            title: 'Recogida del coche',
            description: 'Imperial Rental Cars — recoger en Calcis',
            mapsQuery: 'Calcis Eubea Grecia alquiler de coches',
          },
          {
            id: 'act-0826-2',
            time: 'Mediodía',
            type: 'cultura',
            title: 'Canal de Corinto',
            description: 'Parada en el impresionante canal que separa el Peloponeso de la Grecia continental',
            mapsQuery: 'Canal de Corinto Grecia',
          },
          {
            id: 'act-0826-3',
            time: 'Tarde',
            type: 'cultura',
            title: 'Acrocorinto',
            description: 'Fortaleza medieval sobre el monte Acrocorinto con vistas panorámicas',
            mapsQuery: 'Acrocorinto Grecia',
          },
          {
            id: 'act-0826-4',
            time: 'Noche',
            type: 'traslado',
            title: 'Llegada a Nauplia',
            description: 'Check-in en La Casa de los Conejos',
            mapsQuery: 'Nauplia Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-27',
        date: '2026-08-27',
        label: 'Jue 27 ago',
        notes: '',
        activities: [
          {
            id: 'act-0827-1',
            time: 'Mañana temprano',
            type: 'cultura',
            title: 'Micenas',
            description: 'Visita al yacimiento micénico — Puerta de los Leones y Tumba de Agamenón',
            mapsQuery: 'Micenas Grecia yacimiento arqueológico',
          },
          {
            id: 'act-0827-2',
            time: 'Tarde',
            type: 'playa',
            title: 'Playa de Karathona',
            description: 'Playa tranquila a pocos minutos de Nauplia, accesible en barco o caminando',
            mapsQuery: 'Playa Karathona Nauplia Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-28',
        date: '2026-08-28',
        label: 'Vie 28 ago',
        notes: '',
        activities: [
          {
            id: 'act-0828-1',
            time: 'Mañana',
            type: 'cultura',
            title: 'Teatro de Epidauro',
            description: 'El teatro antiguo mejor conservado del mundo — acústica perfecta',
            mapsQuery: 'Teatro de Epidauro Grecia',
          },
          {
            id: 'act-0828-2',
            time: 'Tarde',
            type: 'playa',
            title: 'Palaia Epidavros',
            description: 'Pueblo costero pintoresco con paseo marítimo y terrazas de restaurantes',
            mapsQuery: 'Palaia Epidavros Grecia',
          },
          {
            id: 'act-0828-3',
            time: 'Tarde',
            type: 'snorkel',
            title: 'Sunken City — Ciudad Sumergida',
            description: 'Snorkel sobre las ruinas sumergidas de la antigua ciudad de Epidauro',
            mapsQuery: 'Sunken City Palaia Epidavros Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-29',
        date: '2026-08-29',
        label: 'Sáb 29 ago',
        notes: '',
        activities: [
          {
            id: 'act-0829-1',
            time: 'Mañana',
            type: 'cultura',
            title: 'Nauplia ciudad',
            description: 'Paseo por el casco antiguo — calle Staïkopoulos, Plateia Syntagmatos y subida a Palamidi',
            mapsQuery: 'Nauplia casco antiguo Grecia',
          },
          {
            id: 'act-0829-2',
            time: 'Tarde',
            type: 'kayak',
            title: 'Kayak frente al castillo de Palamidi y Bourtzi',
            description: 'Kayak de mar con vistas al castillo de Palamidi y al islote Bourtzi',
            mapsQuery: 'Castillo Bourtzi Nauplia Grecia',
          },
        ],
      },
      {
        id: 'day-2026-08-30',
        date: '2026-08-30',
        label: 'Dom 30 ago',
        notes: '',
        activities: [
          {
            id: 'act-0830-1',
            time: 'Todo el día',
            type: 'excursion',
            title: 'Excursión a Spetses',
            description: 'Isla sin coches, calles empedradas, playas de guijarros y ambiente cosmopolita',
            mapsQuery: 'Spetses isla Grecia',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-kalamata',
    name: 'Peloponeso',
    subtitle: 'Base Kalamata',
    color: '#c1440e',
    bgColor: 'rgba(193,68,14,0.08)',
    emoji: '🫒',
    dateRange: '31 ago – 5 sep',
    days: [
      {
        id: 'day-2026-08-31',
        date: '2026-08-31',
        label: 'Lun 31 ago',
        notes: '',
        activities: [
          {
            id: 'act-0831-1',
            time: 'Mañana',
            type: 'cultura',
            title: 'Mistra — ciudad bizantina',
            description: 'Parada en la ciudad medieval de Mistra, Patrimonio de la Humanidad',
            mapsQuery: 'Mistra ciudad bizantina Grecia',
          },
          {
            id: 'act-0831-2',
            time: 'Tarde',
            type: 'traslado',
            title: 'Llegada a Kalamata',
            description: 'Check-in en Airbnb Akrita 32',
            mapsQuery: 'Kalamata Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-01',
        date: '2026-09-01',
        label: 'Mar 1 sep',
        notes: '',
        activities: [
          {
            id: 'act-0901-1',
            time: 'Mañana',
            type: 'excursion',
            title: 'El Mani — Areópoli',
            description: 'Explorar las torres de piedra de Areópoli, capital del Mani interior',
            mapsQuery: 'Areópoli Mani Grecia',
          },
          {
            id: 'act-0901-2',
            time: 'Mediodía',
            type: 'gastronomia',
            title: 'Comida en Limeni',
            description: 'Restaurante sobre el agua en el pintoresco puerto de Limeni',
            mapsQuery: 'Limeni Mani Grecia restaurante',
          },
          {
            id: 'act-0901-3',
            time: 'Mediodía',
            type: 'playa',
            title: 'Baño en Limeni',
            description: 'Aguas cristalinas en el puerto natural de Limeni',
            mapsQuery: 'Limeni playa Mani Grecia',
          },
          {
            id: 'act-0901-4',
            time: 'Tarde',
            type: 'gastronomia',
            title: 'Cata de aceite en almazara',
            description: 'Visita y cata en una almazara tradicional del Mani',
            mapsQuery: 'almazara aceite oliva Mani Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-02',
        date: '2026-09-02',
        label: 'Mié 2 sep',
        notes: '',
        activities: [
          {
            id: 'act-0902-1',
            time: 'Mañana hasta 16h',
            type: 'playa',
            title: 'Playa de Voidokiliá',
            description: 'Una de las playas más espectaculares de Grecia — arena en forma de omega',
            mapsQuery: 'Playa Voidokilia Grecia',
          },
          {
            id: 'act-0902-2',
            time: '16h–18h',
            type: 'cultura',
            title: 'Pylos y Neokastro',
            description: 'Puerto de Pylos y visita al castillo veneciano de Neokastro',
            mapsQuery: 'Neokastro Pylos Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-03',
        date: '2026-09-03',
        label: 'Jue 3 sep',
        notes: '',
        activities: [
          {
            id: 'act-0903-1',
            time: 'Mañana',
            type: 'cultura',
            title: 'Antigua Messene',
            description: 'Yacimiento arqueológico con teatro, estadio y murallas extraordinariamente bien conservados',
            mapsQuery: 'Antigua Messene Grecia yacimiento',
          },
          {
            id: 'act-0903-2',
            time: 'Tarde',
            type: 'excursion',
            title: 'Cascadas de Polylimnio',
            description: 'Ruta de senderismo por las cascadas y piscinas naturales de Polylimnio',
            mapsQuery: 'Cascadas Polylimnio Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-04',
        date: '2026-09-04',
        label: 'Vie 4 sep',
        notes: '',
        activities: [
          {
            id: 'act-0904-1',
            time: 'Todo el día',
            type: 'barco',
            title: 'Barco a Sapientza — Sarcófagos',
            description: 'Excursión en barco a la isla de Sapientza. Snorkel en los famosos Sarcófagos',
            mapsQuery: 'Isla Sapientza Grecia',
          },
          {
            id: 'act-0904-2',
            time: 'Tarde',
            type: 'cultura',
            title: 'Castillo de Methoni',
            description: 'Fortaleza veneciana sobre el mar, una de las más impresionantes de Grecia',
            mapsQuery: 'Castillo Methoni Grecia',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-lefkada',
    name: 'Lefkada',
    subtitle: 'Base Aeraki House',
    color: '#0e6b8f',
    bgColor: 'rgba(14,107,143,0.08)',
    emoji: '⛵',
    dateRange: '5–10 sep',
    days: [
      {
        id: 'day-2026-09-05',
        date: '2026-09-05',
        label: 'Sáb 5 sep',
        notes: '',
        activities: [
          {
            id: 'act-0905-1',
            time: 'Mañana',
            type: 'cultura',
            title: 'Antigua Olimpia',
            description: 'Visita al yacimiento de los Juegos Olímpicos — Templo de Zeus y estadio original',
            mapsQuery: 'Antigua Olimpia Grecia yacimiento',
          },
          {
            id: 'act-0905-2',
            time: 'Tarde',
            type: 'traslado',
            title: 'Cruce del puente de Patras',
            description: 'Paso por el puente Río-Antirio hacia las islas Jónicas',
            mapsQuery: 'Puente Río-Antirio Patras Grecia',
          },
          {
            id: 'act-0905-3',
            time: 'Tarde-Noche',
            type: 'traslado',
            title: 'Llegada a Lefkada',
            description: 'Check-in en Aeraki House',
            mapsQuery: 'Lefkada ciudad Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-06',
        date: '2026-09-06',
        label: 'Dom 6 sep',
        notes: '',
        activities: [
          {
            id: 'act-0906-1',
            time: 'Todo el día',
            type: 'playa',
            title: 'Playa de Porto Katsiki',
            description: 'Playa de acantilados blancos y aguas turquesas — una de las más famosas de Grecia',
            mapsQuery: 'Playa Porto Katsiki Lefkada Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-07',
        date: '2026-09-07',
        label: 'Lun 7 sep',
        notes: '',
        activities: [
          {
            id: 'act-0907-1',
            time: 'Todo el día',
            type: 'playa',
            title: 'Playa de Egremni',
            description: 'Playa salvaje accesible solo por escalera — aguas azul intenso y ambiente tranquilo',
            mapsQuery: 'Playa Egremni Lefkada Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-08',
        date: '2026-09-08',
        label: 'Mar 8 sep',
        notes: '',
        activities: [
          {
            id: 'act-0908-1',
            time: 'Todo el día',
            type: 'playa',
            title: 'Playa de Kathisma',
            description: 'Playa larga de arena fina con chiringuito y aguas cristalinas',
            mapsQuery: 'Playa Kathisma Lefkada Grecia',
          },
        ],
      },
      {
        id: 'day-2026-09-09',
        date: '2026-09-09',
        label: 'Mié 9 sep',
        notes: '',
        activities: [
          {
            id: 'act-0909-1',
            time: 'Todo el día',
            type: 'barco',
            title: 'Excursión en barco desde Nidri',
            description: 'Barco a Meganisi y Skorpios (isla de los Onassis). Alternativa: día de playas si no hay barco.',
            mapsQuery: 'Nidri Lefkada Grecia barco excursión',
          },
        ],
      },
      {
        id: 'day-2026-09-10',
        date: '2026-09-10',
        label: 'Jue 10 sep',
        notes: '',
        activities: [
          {
            id: 'act-0910-1',
            time: 'Mañana',
            type: 'traslado',
            title: 'Vuelta a Atenas',
            description: 'Conducción desde Lefkada hasta Atenas (~5h)',
            mapsQuery: 'Atenas Grecia aeropuerto',
          },
          {
            id: 'act-0910-2',
            time: 'Mediodía',
            type: 'traslado',
            title: 'Devolución del coche',
            description: 'Devolver el coche en el aeropuerto de Atenas',
            mapsQuery: 'Aeropuerto Internacional Atenas Eleftherios Venizelos',
          },
          {
            id: 'act-0910-3',
            time: '15:35',
            type: 'vuelo',
            title: 'Vuelo Atenas → Milán',
            description: 'Ryanair · Salida 15:35 · Llegada 17:15',
            mapsQuery: 'Aeropuerto Internacional Atenas Eleftherios Venizelos',
          },
          {
            id: 'act-0910-4',
            time: 'Noche',
            type: 'traslado',
            title: 'Llegada a Milán — Navigli',
            description: 'Check-in en Apartamento Navigli',
            mapsQuery: 'Navigli Milán Italia',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-milan',
    name: 'Milán',
    subtitle: 'Navigli',
    color: '#7c3aed',
    bgColor: 'rgba(124,58,237,0.08)',
    emoji: '🏙️',
    dateRange: '10–13 sep',
    days: [
      {
        id: 'day-2026-09-11',
        date: '2026-09-11',
        label: 'Vie 11 sep',
        notes: '',
        activities: [
          {
            id: 'act-0911-1',
            type: 'libre',
            title: 'Día libre en Milán',
            description: 'Sin planificación — explorar a tu ritmo',
            mapsQuery: 'Milán Italia',
          },
        ],
      },
      {
        id: 'day-2026-09-12',
        date: '2026-09-12',
        label: 'Sáb 12 sep',
        notes: '',
        activities: [
          {
            id: 'act-0912-1',
            type: 'libre',
            title: 'Día libre en Milán',
            description: 'Sin planificación — explorar a tu ritmo',
            mapsQuery: 'Milán Italia',
          },
        ],
      },
      {
        id: 'day-2026-09-13',
        date: '2026-09-13',
        label: 'Dom 13 sep',
        notes: '',
        activities: [
          {
            id: 'act-0913-1',
            time: '14:45',
            type: 'vuelo',
            title: 'Vuelo Milán → Madrid',
            description: 'Iberia · Salida 14:45 · Llegada 17:05',
            mapsQuery: 'Aeropuerto Malpensa Milán Italia',
          },
        ],
      },
    ],
  },
];