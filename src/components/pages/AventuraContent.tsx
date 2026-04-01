"use client";

import { useState, useCallback, type DragEvent } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";

// ────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────

type Activity = {
  time: string;
  icon: string;
  name: string;
  cost: string;
  free?: boolean;
  desc: string;
  tags: { color: string; label: string }[];
  details?: string;
  map?: string;
};

type Operator = {
  name: string;
  desc: string;
  price: string;
  contact: string;
};

type Route = {
  key: string;
  title: string;
  subtitle: string;
  emoji: string;
  diff: "easy" | "mod" | "hard";
  diffLabel: string;
  costMin: number;
  costMax: number;
  totalMin: number;
  totalMax: number;
  gas: number;
  km: number;
  priceColor: string;
  numGradient: string;
  activities: Activity[];
  operators: Operator[];
  mapUrl: string;
};

// Día 1 — Miércoles: Restrepo + Salinas + Puerto López
const DAY1: Activity[] = [
  {
    time: "10:00",
    icon: "🚙",
    name: "Sale de Villavicencio",
    cost: "Gratis",
    free: true,
    desc: "Vía principal Villavo → Restrepo. 30 min por carretera pavimentada.",
    tags: [{ color: "bg-amber-dim text-amber", label: "Ruta" }],
  },
  {
    time: "10:30",
    icon: "🧂",
    name: "Salinas de Upín — Mina de Sal",
    cost: "~$5K",
    desc: "Mina de sal a cielo abierto, Patrimonio Cultural. Charla + caminata por hornos antiguos y cañón. En Restrepo, a 15 km de Villavo.",
    tags: [{ color: "bg-amber-dim text-amber", label: "Patrimonio" }],
    details: "📞 +57 313 470 7079\nRestrepo a 15 km de Villavo",
  },
  {
    time: "12:00",
    icon: "🌾",
    name: "Ruta a Puerto López",
    cost: "Gratis",
    free: true,
    desc: "Restrepo → Cumaral → Puerto López (1.5h). Sabanas infinitas, palmas de moriche.",
    tags: [
      { color: "bg-amber-dim text-amber", label: "Ruta 4x4" },
      { color: "bg-amber-dim text-amber", label: "Paisaje llanero" },
    ],
  },
  {
    time: "13:30",
    icon: "🗿",
    name: "Puerto López — Ombligo de Colombia",
    cost: "$0–25K",
    desc: "Obelisco en Alto de Menegua — centro geográfico de Colombia, vista 360°. Gratis. Pescado fresco o cocinar con estufa.",
    tags: [
      { color: "bg-amber-dim text-amber", label: "Obelisco" },
      { color: "bg-red-dim text-red", label: "Pescado fresco" },
      { color: "bg-cyan-dim text-cyan", label: "Río Meta" },
    ],
  },
  {
    time: "16:30",
    icon: "🌅",
    name: "Atardecer río Meta + regreso",
    cost: "Gratis",
    free: true,
    desc: "Uno de los atardeceres más bonitos de Colombia. Regreso ~2h a Villavo.",
    tags: [{ color: "bg-amber-dim text-amber", label: "Atardecer épico" }],
  },
];

// Día 2 — Jueves: Bioparque + Cristo Rey + Cabalgata
const DAY2: Activity[] = [
  {
    time: "9:00",
    icon: "🦎",
    name: "Bioparque Los Ocarros",
    cost: "$15–21K",
    desc: "Único bioparque de fauna llanera en Colombia. Chigüiros, anacondas, jaguares, dantas, caimanes. 2h de recorrido.",
    tags: [{ color: "bg-violet-dim text-violet", label: "Fauna" }],
    details:
      "Adultos: $15.000 · Niños: $12.000\nGuía: $20.000 · Parqueo: $6.000\nHorario: 9am–4pm\n📞 +57 300 815 6222",
    map: "https://www.google.com/maps/search/Bioparque+Los+Ocarros+Villavicencio",
  },
  {
    time: "11:30",
    icon: "⛪",
    name: "Cristo Rey + Mirador",
    cost: "Gratis",
    free: true,
    desc: "Monumento de 30m en el Cerro Redentor. Vista panorámica de Villavo y los Llanos. Calle 40 con Cra 33.",
    tags: [
      { color: "bg-amber-dim text-amber", label: "Mirador" },
      { color: "bg-green-dim text-green", label: "Gratis" },
    ],
  },
  {
    time: "12:30",
    icon: "🍳",
    name: "Almuerzo",
    cost: "$0–18K",
    desc: "Cocinar con estufa portátil ($0) o corrientazo en Parque Fundadores ~$12K–$18K.",
    tags: [
      { color: "bg-red-dim text-red", label: "Comida" },
      { color: "bg-green-dim text-green", label: "Estufa = $0" },
    ],
  },
  {
    time: "14:00",
    icon: "🛻",
    name: "Trochas off-road vía El Carmen",
    cost: "Gratis",
    free: true,
    desc: "Ruta alterna por veredas con caminos de tierra, cruces de arroyos. ~30 km de trocha. Poner la Oroch en Lock.",
    tags: [{ color: "bg-amber-dim text-amber", label: "Off-road" }],
  },
  {
    time: "15:30",
    icon: "🐴",
    name: "Cabalgata Gramalote",
    cost: "$45–85K",
    desc: "Campo ecológico certificado. 3 rutas: La Manigua, Cascada El Salto del Ángel, Rincón de los Micos. 700m después del peaje Puente Amarillo vía Restrepo.",
    tags: [
      { color: "bg-amber-dim text-amber", label: "Cabalgata" },
      { color: "bg-violet-dim text-violet", label: "Vida llanera" },
    ],
    details:
      "1 hora: $45.000 · 2 horas: $85.000\n📞 +57 317 403 2367 · +57 310 628 2528",
    map: "https://www.google.com/maps/search/Campo+Ecologico+Gramalote+Villavicencio",
  },
  {
    time: "17:30",
    icon: "🌅",
    name: "Atardecer vía antigua a Restrepo",
    cost: "Gratis",
    free: true,
    desc: "Puntos elevados con vista del llano al atardecer. Trocha suave para la Oroch.",
    tags: [
      { color: "bg-amber-dim text-amber", label: "Mirador" },
      { color: "bg-amber-dim text-amber", label: "4x4 suave" },
    ],
  },
];

// Día 4 — Sábado: Delfines Rosados
const DAY4: Activity[] = [
  {
    time: "4:30",
    icon: "🌄",
    name: "Madrugón a Pto Gaitán",
    cost: "Gratis",
    free: true,
    desc: "~3h por carretera plana. Garzas, chigüiros al amanecer.",
    tags: [{ color: "bg-violet-dim text-violet", label: "Fauna en ruta" }],
  },
  {
    time: "7:30",
    icon: "🚣",
    name: "Río Manacacías — Lanchas",
    cost: "$23–30K",
    desc: '"La Puerta al Paraíso" (8km del pueblo). Potrillo hasta Las Bocas donde convergen ríos Manacacías, Yucao y Meta.',
    tags: [
      { color: "bg-violet-dim text-violet", label: "Delfines rosados" },
      { color: "bg-cyan-dim text-cyan", label: "Río Manacacías" },
    ],
    details:
      "Lancheros locales: ~$30.000/persona\nFishing Colombia: ~$140.000/lancha (~$23K si van 6)\nJhorman Guía: @jhormanguia",
  },
  {
    time: "10:00",
    icon: "🐬",
    name: "Avistamiento + Baño",
    cost: "Incluido",
    free: true,
    desc: "Delfines rosados jugando en la superficie. Se puede nadar. Llevar protector solar.",
    tags: [
      { color: "bg-violet-dim text-violet", label: "Toninas" },
      { color: "bg-cyan-dim text-cyan", label: "Baño" },
    ],
  },
  {
    time: "12:00",
    icon: "🍽️",
    name: "Almuerzo + Regreso",
    cost: "$0–20K",
    desc: "Cocinar con estufa a orilla del río o pescado moqueado/cachama local (~$15–20K).",
    tags: [{ color: "bg-red-dim text-red", label: "Pescado moqueado" }],
  },
];

// Día 5 — Domingo: Despedida
const DAY5: Activity[] = [
  {
    time: "7:00",
    icon: "💧",
    name: "Cascada Cueva del Oso",
    cost: "Gratis",
    free: true,
    desc: "A 10 min de Villavo por vía antigua a Restrepo. Pasando el puente, primera entrada izquierda. 300m caminando y bajas a la cascada.",
    tags: [
      { color: "bg-cyan-dim text-cyan", label: "Cascada" },
      { color: "bg-green-dim text-green", label: "Gratis" },
    ],
    details: "Gratis · Zapatos que se mojen. No dejar basura.",
  },
  {
    time: "9:30",
    icon: "🌊",
    name: "Caño Buque",
    cost: "Gratis",
    free: true,
    desc: "Caño de agua cristalina y fría. Vía antigua Villavo–Restrepo, costado izquierdo. Poco conocido = tranquilo.",
    tags: [
      { color: "bg-cyan-dim text-cyan", label: "Caño cristalino" },
      { color: "bg-green-dim text-green", label: "Gratis" },
    ],
  },
  {
    time: "11:30",
    icon: "🍽️",
    name: "Almuerzo de despedida",
    cost: "$0–20K",
    desc: "Estufa ($0) o mamona llanera en vía Catama ~$15K–$20K.",
    tags: [{ color: "bg-red-dim text-red", label: "Comida" }],
  },
  {
    time: "13:00",
    icon: "🌳",
    name: "Parque de la Vida (opcional)",
    cost: "Gratis",
    free: true,
    desc: "Senderos, laguna, puentes colgantes, zona de picnic. Barrio Barzal.",
    tags: [
      { color: "bg-amber-dim text-amber", label: "Parque" },
      { color: "bg-green-dim text-green", label: "Gratis" },
    ],
  },
  {
    time: "15:00",
    icon: "🏠",
    name: "Regreso a casa",
    cost: "Gratis",
    free: true,
    desc: "Empacar, cargar la Oroch y vuelta. Salir temprano para evitar trancón.",
    tags: [],
  },
];

// Día 3 — Viernes: Elige tu aventura (3 opciones)
const ROUTES: Record<string, Route> = {
  A: {
    key: "A",
    title: "Acacías + Cubarral",
    subtitle: "Villavo → Acacías → Cubarral — ~160 km",
    emoji: "🌊",
    diff: "mod",
    diffLabel: "Moderada — Senderos montaña, pavimentado",
    costMin: 30000,
    costMax: 50000,
    totalMin: 200000,
    totalMax: 260000,
    gas: 160000,
    km: 600,
    priceColor: "text-blue-400",
    numGradient: "from-blue-400 to-blue-600",
    activities: [
      {
        time: "7:00",
        icon: "💎",
        name: "Cascadas San Miguel",
        cost: "Gratis",
        free: true,
        desc: "Aguas verde-azul espectaculares a 20 min de Acacías. Sendero ~1 km. Zapatos antideslizantes obligatorios.",
        tags: [
          { color: "bg-cyan-dim text-cyan", label: "Cascadas" },
          { color: "bg-green-dim text-green", label: "Gratis" },
        ],
        details:
          "Entrada: Gratis (parqueo ~$3K)\nCon guía Meraki: $15K\nHorario: 8am–3pm",
        map: "https://www.google.com/maps/search/Cascadas+San+Miguel+Acacias+Meta",
      },
      {
        time: "10:30",
        icon: "🏊",
        name: "Pozos La Chorrera + Mirador",
        cost: "$3–5K",
        desc: "Reserva natural con pozos cristalinos de montaña y el mirador más alto de Acacías.",
        tags: [
          { color: "bg-cyan-dim text-cyan", label: "Pozos naturales" },
          { color: "bg-amber-dim text-amber", label: "Mirador" },
        ],
        details: "📞 +57 318 555 9323",
      },
      {
        time: "12:30",
        icon: "🍽️",
        name: "Almuerzo en Acacías",
        cost: "$12–18K",
        desc: "Corrientazo llanero. Tanquear la Oroch.",
        tags: [{ color: "bg-red-dim text-red", label: "Comida llanera" }],
      },
      {
        time: "14:00",
        icon: "💧",
        name: "Cascada La Esmeralda — Cubarral",
        cost: "$5–10K",
        desc: "Cascada de 8m = jacuzzi natural cristalino. Caminata ~40 min por sendero ecológico.",
        tags: [
          { color: "bg-cyan-dim text-cyan", label: "Cascada" },
          { color: "bg-cyan-dim text-cyan", label: "Jacuzzi natural" },
        ],
        details:
          "CubarralXtremo: torrentismo/rafting\nLlanoTravel: 📞 +57 322 944 3862",
        map: "https://www.google.com/maps/search/Cascada+La+Esmeralda+Cubarral+Meta",
      },
      {
        time: "17:00",
        icon: "🚗",
        name: "Regreso a Villavicencio",
        cost: "Gratis",
        free: true,
        desc: "Cubarral → Guamal → Acacías → Villavo (~1.5h). Todo pavimentado.",
        tags: [],
      },
    ],
    operators: [],
    mapUrl:
      "https://www.google.com/maps/dir/Villavicencio,+Meta,+Colombia/Acacias,+Meta,+Colombia/Cubarral,+Meta,+Colombia/Villavicencio,+Meta,+Colombia",
  },
  B: {
    key: "B",
    title: "La Cumbre + Palmichal",
    subtitle: "Dentro de Villavicencio — ~30 km total",
    emoji: "🌿",
    diff: "mod",
    diffLabel: "Moderada — Trekking montaña 8 km",
    costMin: 15000,
    costMax: 30000,
    totalMin: 180000,
    totalMax: 235000,
    gas: 120000,
    km: 500,
    priceColor: "text-green",
    numGradient: "from-green-400 to-green-600",
    activities: [
      {
        time: "6:30",
        icon: "⛰️",
        name: "Cascadas de La Cumbre (x4)",
        cost: "~$5K",
        desc: "Trekking épico. 4 cascadas: La Golondrina, Cupido, La Anaconda y Tres Pozos. 4–5h ida y vuelta.",
        tags: [
          { color: "bg-cyan-dim text-cyan", label: "4 Cascadas" },
          { color: "bg-amber-dim text-amber", label: "Trekking" },
        ],
        details:
          "Entrada: ~$5.000\nInicio: Av. principal La Cuncia (vía Villavo–Acacías)",
        map: "https://www.google.com/maps/search/Vereda+La+Cumbre+cascadas+Villavicencio",
      },
      {
        time: "12:00",
        icon: "🍽️",
        name: "Almuerzo en Villavicencio",
        cost: "$12–15K",
        desc: "Bajan de La Cumbre y almuerzan. Corrientazo ~$12–15K.",
        tags: [{ color: "bg-red-dim text-red", label: "Comida llanera" }],
      },
      {
        time: "14:00",
        icon: "🌊",
        name: "Cascada Palmichal",
        cost: "~$3K",
        desc: "La cascada más bonita de Villavicencio. Caminar ~1.5h por sendero natural. Agua cristalina.",
        tags: [
          { color: "bg-cyan-dim text-cyan", label: "Cascada" },
          { color: "bg-amber-dim text-amber", label: "Senderismo" },
        ],
        details:
          "Entrada finca: ~$3.000\nVereda La Argentina, después del puente mano izquierda",
        map: "https://www.google.com/maps/search/Cascada+Palmichal+Villavicencio",
      },
      {
        time: "17:30",
        icon: "🏠",
        name: "Regreso a casa",
        cost: "Gratis",
        free: true,
        desc: "Todo dentro de Villavo, máximo 30 min.",
        tags: [],
      },
    ],
    operators: [],
    mapUrl:
      "https://www.google.com/maps/dir/Villavicencio,+Meta,+Colombia/La+Cuncia,+Villavicencio,+Meta,+Colombia/Villavicencio,+Meta,+Colombia",
  },
  C: {
    key: "C",
    title: "Termales + Cascada",
    subtitle: "Villavo → Barranca de Upía → Acacías — ~220 km",
    emoji: "♨️",
    diff: "easy",
    diffLabel: "Fácil — Pavimentado, sin trocha",
    costMin: 55000,
    costMax: 75000,
    totalMin: 220000,
    totalMax: 290000,
    gas: 170000,
    km: 660,
    priceColor: "text-violet",
    numGradient: "from-violet-400 to-violet-600",
    activities: [
      {
        time: "5:00",
        icon: "♨️",
        name: "Termales Guaicaramo",
        cost: "$10–38K",
        desc: "Aguas naturales de diferentes temperaturas. Piscina termal, baños turcos, lodo terapéutico.",
        tags: [
          { color: "bg-violet-dim text-violet", label: "Termales" },
          { color: "bg-violet-dim text-violet", label: "Lodo terapéutico" },
        ],
        details:
          "Guaicaramo: $10.000/persona (bono solidario)\nAguas Calientes: $38.000/persona\n📞 +57 310 751 8226",
        map: "https://www.google.com/maps/search/Termales+Guaicaramo+Barranca+de+Upia+Meta",
      },
      {
        time: "12:00",
        icon: "🍽️",
        name: "Almuerzo + regreso por Acacías",
        cost: "~$15K",
        desc: "Almuerzo en ruta. Vía de regreso pasando por Acacías.",
        tags: [{ color: "bg-red-dim text-red", label: "Comida llanera" }],
      },
      {
        time: "15:00",
        icon: "💧",
        name: "Cascada Las Escaleras",
        cost: "$3K",
        desc: "Entre Acacías y Guamal. Charco con aguas verdes cristalinas, cascadas tipo escaleras. Caminata 10 min.",
        tags: [
          { color: "bg-cyan-dim text-cyan", label: "Cascada" },
          { color: "bg-cyan-dim text-cyan", label: "Charco cristalino" },
        ],
        details: "Entrada: $3.000/persona\nA 35 min de Villavicencio",
        map: "https://www.google.com/maps/search/Cascada+Las+Escaleras+Acacias+Guamal+Meta",
      },
      {
        time: "17:00",
        icon: "🚗",
        name: "Regreso a Villavicencio",
        cost: "Gratis",
        free: true,
        desc: "Acacías/Guamal → Villavo ~40 min. Todo pavimentado.",
        tags: [],
      },
    ],
    operators: [],
    mapUrl:
      "https://www.google.com/maps/dir/Villavicencio,+Meta,+Colombia/Barranca+de+Upia,+Meta,+Colombia/Acacias,+Meta,+Colombia/Villavicencio,+Meta,+Colombia",
  },
};

const FIXED = {
  d1Min: 45000,
  d1Max: 45000,
  d2Min: 80000,
  d2Max: 120000,
  d4Min: 55000,
  d4Max: 85000,
  d5Min: 5000,
  d5Max: 10000,
};

const PACK_ITEMS = [
  "Zapatos que se puedan mojar",
  "Protector solar fuerte",
  "Repelente de insectos",
  "Toalla de secado rápido",
  "Ropa de cambio (2 mudas)",
  "Linterna o frontal",
  "Botiquín básico",
  "Bolsas impermeables p/ celular",
  "Cuerda o lazo (por si acaso)",
  "Snacks y agua (mín 2L c/u)",
  "Sombrero / gorra",
  "Binoculares (si tienen)",
  "🔥 Estufa portátil + bombona",
  "🍳 Olla, sartén, platos, cubiertos",
  "🥫 Mercado: arroz, atún, huevos, pan, café",
];

const CAR_ITEMS = [
  "Revisar presión llantas (+ repuesto)",
  "Verificar aceite y refrigerante",
  "Gato hidráulico + cruceta",
  "Tanquear full antes de cada día",
  "Cable de arranque",
  "Herramienta básica",
];

// ────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────

function fmtCOP(n: number) {
  return "$" + n.toLocaleString("es-CO");
}

const DIFF_STYLE: Record<string, string> = {
  easy: "bg-green-dim text-green",
  mod: "bg-amber-dim text-amber",
  hard: "bg-red-dim text-red",
};

// ────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ────────────────────────────────────────────────────────

function ActivityCard({ act }: { act: Activity }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2/60 border border-transparent hover:border-border-emphasis"
    >
      {/* top row */}
      <div className="flex items-center gap-2">
        <span className="shrink-0 rounded-md bg-green-dim px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold text-green">
          {act.time}
        </span>
        <span className="flex-1 text-sm font-semibold text-text-primary truncate">
          {act.icon} {act.name}
        </span>
        <span
          className={`shrink-0 text-xs font-bold ${act.free ? "text-green" : "text-amber"}`}
        >
          {act.cost}
        </span>
        <span
          className={`text-[0.6rem] text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </div>

      {/* expanded */}
      {open && (
        <div className="mt-2 animate-in slide-in-from-top-1 duration-200">
          <p className="text-xs leading-relaxed text-text-secondary">
            {act.desc}
          </p>

          {act.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {act.tags.map((t) => (
                <Badge
                  key={t.label}
                  variant="secondary"
                  className={`text-[0.55rem] ${t.color}`}
                >
                  {t.label}
                </Badge>
              ))}
            </div>
          )}

          {act.details && (
            <div className="mt-2 border-t border-border-emphasis pt-2 text-xs text-text-secondary whitespace-pre-line">
              {act.details}
            </div>
          )}

          {act.map && (
            <a
              href={act.map}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-1.5 inline-block text-xs font-medium text-blue-400 hover:underline"
            >
              📍 Ver en Maps
            </a>
          )}
        </div>
      )}
    </button>
  );
}

function DayColumn({
  day,
  dayLabel,
  date,
  title,
  route,
  diff,
  diffLabel,
  costLabel,
  numGradient,
  activities,
  children,
  className = "",
}: {
  day: number;
  dayLabel: string;
  date: string;
  title: string;
  route: string;
  diff: string;
  diffLabel: string;
  costLabel: string;
  numGradient: string;
  activities?: Activity[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`flex flex-col min-h-[340px] ${className}`}>
      {/* header */}
      <div className="flex items-center gap-3 border-b border-border-emphasis px-4 py-3">
        <div
          className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-br ${numGradient} text-white`}
        >
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-[0.45rem] font-semibold uppercase tracking-wider opacity-80">
            {dayLabel}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-text-primary truncate">
            {title}
          </h3>
          <p className="text-[0.65rem] text-text-tertiary">
            {route} — {date}
          </p>
          {diffLabel && (
            <span
              className={`mt-0.5 inline-block rounded-md px-2 py-0.5 text-[0.6rem] font-semibold ${DIFF_STYLE[diff] ?? "bg-amber-dim text-amber"}`}
            >
              {diffLabel}
            </span>
          )}
        </div>
      </div>

      {/* body */}
      <CardContent className="flex-1 overflow-y-auto space-y-0.5 !px-1 !py-1 max-h-[460px]">
        {activities?.map((a) => (
          <ActivityCard key={a.time + a.name} act={a} />
        ))}
        {children}
      </CardContent>

      {/* footer */}
      <CardFooter className="flex justify-between text-sm">
        <span className="text-text-tertiary text-xs">Día {day} / persona</span>
        <span className="font-bold text-green">{costLabel}</span>
      </CardFooter>
    </Card>
  );
}

function RoutePickerCard({
  route,
  selected,
  dimmed,
  onSelect,
  onDragStart,
}: {
  route: Route;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
  onDragStart: (e: DragEvent) => void;
}) {
  return (
    <Card
      className={`cursor-grab active:cursor-grabbing transition-all select-none relative ${
        selected
          ? "ring-2 ring-amber shadow-[0_0_24px_rgba(251,191,36,0.1)]"
          : dimmed
            ? "opacity-40 scale-[0.97]"
            : "hover:-translate-y-1 hover:ring-1 hover:ring-border-strong"
      }`}
      draggable
      onClick={onSelect}
      onDragStart={onDragStart}
    >
      {selected && (
        <span className="absolute top-2 right-3 rounded-full bg-amber px-2 py-0.5 text-[0.55rem] font-bold text-black">
          ✓ Seleccionado
        </span>
      )}
      <CardContent className="space-y-2">
        <span className="text-2xl">{route.emoji}</span>
        <h4 className="font-bold text-text-primary">
          Opción {route.key} — {route.title}
        </h4>
        <p className="text-xs text-text-secondary">{route.subtitle}</p>
        <p className={`text-lg font-bold ${route.priceColor}`}>
          ${route.costMin / 1000}K–${route.costMax / 1000}K
          <span className="ml-1 text-xs font-normal text-text-muted">
            / persona
          </span>
        </p>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-[0.55rem]">
            {route.diffLabel.split("—")[0].trim()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-text-primary">{title}</h3>
          <span className="text-xs text-text-muted font-mono">
            {checked.size}/{items.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {items.map((item, i) => (
            <label
              key={item}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm cursor-pointer transition-colors hover:bg-surface-2/60 ${
                checked.has(i)
                  ? "text-text-muted line-through"
                  : "text-text-secondary"
              }`}
            >
              <input
                type="checkbox"
                checked={checked.has(i)}
                onChange={() => toggle(i)}
                className="h-4 w-4 rounded accent-green-400"
              />
              {item}
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ────────────────────────────────────────────────────────
// MAIN COMPONENT
// ────────────────────────────────────────────────────────

export function AventuraContent() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const route = selectedRoute ? ROUTES[selectedRoute] : null;

  // costs
  const minTotal =
    FIXED.d1Min +
    FIXED.d2Min +
    FIXED.d4Min +
    FIXED.d5Min +
    (route?.costMin ?? 0);
  const maxTotal =
    FIXED.d1Max +
    FIXED.d2Max +
    FIXED.d4Max +
    FIXED.d5Max +
    (route?.costMax ?? 0);
  const gas = route?.gas ?? 120000;
  const km = route?.km ?? 560;
  const daysPlanned = route ? 5 : 4;

  const handleSelect = useCallback(
    (key: string) => setSelectedRoute((prev) => (prev === key ? null : key)),
    [],
  );

  const handleDragStart = useCallback((e: DragEvent, key: string) => {
    e.dataTransfer.setData("text/plain", key);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const key = e.dataTransfer.getData("text/plain");
      if (ROUTES[key]) handleSelect(key);
    },
    [handleSelect],
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const shareWhatsApp = () => {
    let msg = "*Plan Villavicencio 5 Días*\n📅 Abr 1–5, 2026 · Oroch 4x4\n\n";
    msg += "• Mié: Restrepo + Salinas + Puerto López\n";
    msg += "• Jue: Bioparque Ocarros + Cabalgata + Cristo Rey\n";
    msg += route
      ? `• Vie: ${route.emoji} ${route.title} ($${route.costMin / 1000}K–$${route.costMax / 1000}K)\n`
      : "• Vie: ¡Por definir! Hay 3 opciones\n";
    msg += "• Sáb: 🐬 Delfines Rosados en Pto Gaitán\n";
    msg += "• Dom: Cascada Cueva del Oso + Caño Buque\n\n";
    if (route)
      msg += `💰 Total: ${fmtCOP(route.totalMin)}–${fmtCOP(route.totalMax)}/persona + gas ~${fmtCOP(route.gas)}\n`;
    msg += "\n¿Se van? 🔥";
    window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
  };

  return (
    <div className="pb-16">
      {/* ── Sticky Cost Bar ── */}
      <div className="sticky top-14 z-40 border-b border-border-emphasis bg-background/90 backdrop-blur-lg px-4 py-2.5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Presupuesto / persona
            </span>
            <span className="text-xl font-extrabold text-amber tabular-nums transition-all">
              {fmtCOP(minTotal)}–{fmtCOP(maxTotal)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-amber-dim text-amber text-[0.65rem]"
            >
              ⛽ ~{fmtCOP(gas)}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-dim text-green text-[0.65rem]"
            >
              📅 {daysPlanned} de 5 días
            </Badge>
            <Badge
              variant="secondary"
              className="bg-cyan-dim text-cyan text-[0.65rem]"
            >
              🛣️ ~{km} km
            </Badge>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <FadeIn>
        <header className="mx-auto max-w-6xl px-4 pt-12 pb-8 text-center">
          <p className="text-5xl mb-3">🗺️</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green to-emerald-300 bg-clip-text text-transparent">
            Plan Villavicencio 5 Días
          </h1>
          <p className="mt-1 text-text-secondary">
            Oroch 4x4 · Naturaleza · Aventura · Presupuesto &lt; $500K
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["Miércoles a Domingo", "Hospedaje $0", "Renault Oroch 4x4"].map(
              (t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="bg-green-dim text-green"
                >
                  {t}
                </Badge>
              ),
            )}
            <Badge variant="secondary" className="bg-amber-dim text-amber">
              🔥 Estufa portátil
            </Badge>
          </div>
        </header>
      </FadeIn>

      {/* ── Tip ── */}
      <div className="mx-auto max-w-6xl px-4 mb-8">
        <div className="rounded-r-xl border-l-[3px] border-amber bg-amber-dim px-4 py-3 text-sm text-amber">
          <strong className="text-amber">
            4 días fijos + 1 día donde eliges tu aventura (Día 3).
          </strong>{" "}
          Arrastra o haz clic en una de las 3 opciones para armar tu Viernes —
          el costo total se actualiza al instante.
        </div>
      </div>

      {/* ── Day Grid ── */}
      <section className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[3px] text-text-tertiary mb-5">
          Tu Itinerario
        </h2>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Day 1 — Miércoles */}
          <FadeIn>
            <DayColumn
              day={1}
              dayLabel="Mié"
              date="Abr 1"
              title="Restrepo + Puerto López"
              route="Villavo → Restrepo → Pto López"
              diff="mod"
              diffLabel="Moderado"
              costLabel="~$45K"
              numGradient="from-green to-emerald-600"
              activities={DAY1}
            />
          </FadeIn>

          {/* Day 2 — Jueves */}
          <FadeIn delay={0.05}>
            <DayColumn
              day={2}
              dayLabel="Jue"
              date="Abr 2"
              title="Fauna + Cabalgata + Trochas"
              route="Villavicencio local"
              diff="easy"
              diffLabel="Fácil"
              costLabel="~$80–120K"
              numGradient="from-green to-emerald-600"
              activities={DAY2}
            />
          </FadeIn>

          {/* Day 3 — Viernes — Drop Zone */}
          <FadeIn delay={0.1}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <DayColumn
                day={3}
                dayLabel="Vie"
                date="Abr 3"
                title={
                  route ? `${route.emoji} ${route.title}` : "Elige tu aventura"
                }
                route={route ? route.subtitle : "Arrastra una opción aquí"}
                diff={route?.diff ?? "mod"}
                diffLabel={route?.diffLabel ?? ""}
                costLabel={
                  route
                    ? `$${route.costMin / 1000}K–$${route.costMax / 1000}K`
                    : "—"
                }
                numGradient={
                  route?.numGradient ?? "from-slate-500 to-slate-600"
                }
                activities={route?.activities}
                className={`transition-all ${
                  dragOver
                    ? "ring-2 ring-amber shadow-[0_0_24px_rgba(251,191,36,0.12)]"
                    : route
                      ? "ring-1 ring-amber/30"
                      : ""
                }`}
              >
                {!route && (
                  <div
                    className={`flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed py-10 transition-all ${
                      dragOver
                        ? "border-amber bg-amber-dim"
                        : "border-border-strong"
                    }`}
                  >
                    <span className="text-3xl opacity-50">🎯</span>
                    <p className="mt-2 text-sm font-medium text-text-secondary">
                      Arrastra una opción aquí
                    </p>
                    <p className="text-xs text-text-muted">
                      o haz clic en las opciones de abajo
                    </p>
                  </div>
                )}

                {route && route.operators.length > 0 && (
                  <div className="mx-2 mt-1 space-y-1.5">
                    <p className="text-[0.65rem] font-semibold text-amber px-1">
                      📋 Guías y operadores
                    </p>
                    {route.operators.map((op) => (
                      <div
                        key={op.name}
                        className="rounded-lg border border-border-emphasis bg-surface-1/50 px-3 py-2 text-xs"
                      >
                        <p className="font-semibold text-text-primary">
                          {op.name}
                        </p>
                        <p className="text-text-secondary">{op.desc}</p>
                        <p className="mt-0.5 font-semibold text-amber">
                          {op.price}
                        </p>
                        <p className="text-green">{op.contact}</p>
                      </div>
                    ))}
                  </div>
                )}

                {route && (
                  <a
                    href={route.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2 mt-2 mb-1 inline-block rounded-lg border border-border-emphasis bg-green-dim px-3 py-1.5 text-xs font-semibold text-green hover:bg-green/10 transition-colors"
                  >
                    📍 Ruta Día 3 en Maps
                  </a>
                )}
              </DayColumn>
            </div>
          </FadeIn>

          {/* Day 4 — Sábado */}
          <FadeIn delay={0.15}>
            <DayColumn
              day={4}
              dayLabel="Sáb"
              date="Abr 4"
              title="Delfines Rosados"
              route="Villavo → Pto Gaitán — ~380 km ida/vuelta"
              diff="mod"
              diffLabel="Largo (3h/tramo)"
              costLabel="$55–85K"
              numGradient="from-green to-emerald-600"
              activities={DAY4}
            />
          </FadeIn>

          {/* Day 5 — Domingo */}
          <FadeIn delay={0.2}>
            <DayColumn
              day={5}
              dayLabel="Dom"
              date="Abr 5"
              title="Cascada + Caño + Despedida"
              route="Villavicencio local — ~15 km"
              diff="easy"
              diffLabel="Fácil — Todo cerca"
              costLabel="~$5–10K"
              numGradient="from-green to-emerald-600"
              activities={DAY5}
            />
          </FadeIn>
        </div>
      </section>

      {/* ── Route Picker ── */}
      <section className="mx-auto max-w-6xl px-4 mt-12">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[3px] text-amber mb-2">
          Elige tu Viernes
        </h2>
        <p className="text-center text-xs text-text-muted mb-6">
          Haz clic o arrastra una opción al Día 3
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.values(ROUTES).map((r) => (
            <FadeIn key={r.key}>
              <RoutePickerCard
                route={r}
                selected={selectedRoute === r.key}
                dimmed={!!selectedRoute && selectedRoute !== r.key}
                onSelect={() => handleSelect(r.key)}
                onDragStart={(e) => handleDragStart(e, r.key)}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="mx-auto max-w-6xl px-4 mt-12">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[3px] text-text-tertiary mb-5">
          Comparación Rápida
        </h2>
        <Card>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-emphasis text-amber">
                  <th className="text-left py-2 px-2 font-semibold" />
                  <th className="py-2 px-2 font-semibold">🌊 A</th>
                  <th className="py-2 px-2 font-semibold">🌿 B</th>
                  <th className="py-2 px-2 font-semibold">♨️ C</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {[
                  [
                    "Destino",
                    "San Miguel + Cubarral",
                    "La Cumbre + Palmichal",
                    "Guaicaramo + Escaleras",
                    -1,
                  ],
                  ["Distancia", "~160 km", "~30 km ⭐", "~220 km", 1],
                  [
                    "Cascadas",
                    "3 cascadas ⭐",
                    "5 cascadas",
                    "1 + termales",
                    0,
                  ],
                  [
                    "Dificultad",
                    "🟡 Moderada",
                    "🟡 Moderada",
                    "🟢 Fácil ⭐",
                    2,
                  ],
                  ["4x4", "No", "No", "No", -1],
                  [
                    "Tipo",
                    "Cascadas + pozos",
                    "Trekking montaña",
                    "Relax termal",
                    -1,
                  ],
                  ["Costo Día 3", "$30K–$50K", "$15K–$30K ⭐", "$55K–$75K", 1],
                  [
                    "Total 5 días",
                    "$200K–$260K",
                    "$180K–$235K ⭐",
                    "$220K–$290K",
                    1,
                  ],
                  ["Gasolina", "~$160K", "~$120K ⭐", "~$170K", 1],
                ].map((row) => {
                  const best = row[4] as number;
                  return (
                    <tr
                      key={row[0] as string}
                      className="border-b border-border-emphasis/50"
                    >
                      <td className="py-2 px-2 font-semibold text-green whitespace-nowrap">
                        {row[0]}
                      </td>
                      {[1, 2, 3].map((i) => (
                        <td
                          key={i}
                          className={`py-2 px-2 text-center ${i - 1 === best ? "text-green font-semibold bg-green-dim/40" : ""}`}
                        >
                          {row[i] as string}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* ── Checklists ── */}
      <section className="mx-auto max-w-3xl px-4 mt-12 space-y-4">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[3px] text-text-tertiary mb-5">
          Checklists
        </h2>
        <FadeIn>
          <ChecklistCard title="🎒 Qué empacar" items={PACK_ITEMS} />
        </FadeIn>
        <FadeIn delay={0.05}>
          <ChecklistCard title="🚙 Checklist Oroch" items={CAR_ITEMS} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card>
            <CardContent>
              <h3 className="font-bold text-text-primary mb-3">
                📱 Apps recomendadas
              </h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>
                  <strong className="text-text-primary">Wikiloc</strong> — Rutas
                  off-road verificadas en el Meta
                </p>
                <p>
                  <strong className="text-text-primary">Maps.me</strong> — Mapas
                  offline para las trochas
                </p>
                <p>
                  <strong className="text-text-primary">Waze</strong> — Para
                  rutas principales
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <div className="mx-auto max-w-3xl px-4 mt-12 pt-6 border-t border-border-emphasis text-center text-xs text-text-muted space-y-1">
        <p>Plan armado para Cristhian y crew — Abril 2026</p>
        <p>
          Precios investigados en fuentes públicas (marzo–abril 2026). Confirmar
          directamente con operadores.
        </p>
        <p>
          Todos los números son colombianos (+57). Pueden escribir por WhatsApp.
        </p>
        <p className="text-green">
          🔥 Totales reflejan ahorro con estufa portátil de gas.
        </p>
        <button
          onClick={shareWhatsApp}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20 hover:-translate-y-0.5"
        >
          📲 Compartir por WhatsApp
        </button>
      </div>
    </div>
  );
}
