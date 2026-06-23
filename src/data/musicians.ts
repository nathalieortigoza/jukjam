export interface Musician {
  id: string;
  name: string;
  genres: string[];
  description: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  photos: string[];
  setlist: string[];
  city: string;
  createdAt: string;
}

export const MUSICIANS: Musician[] = [
  {
    id: "luna-llena-salsa-band",
    name: "Luna Llena Salsa Band",
    genres: ["Salsa"],
    description:
      "Agrupación colombiana que reinventa la salsa con una propuesta contemporánea llena de energía, identidad y sabor. Desde Bogotá, fusiona la tradición salsera con sonidos modernos para crear experiencias musicales vibrantes que conectan generaciones y ponen a bailar al público dentro y fuera de Colombia.",
    priceMin: 1800000,
    priceMax: 4500000,
    rating: 4.9,
    reviewCount: 0,
    photos: [
      "/musicians/luna-llena/foto-1.jpg",
      "/musicians/luna-llena/foto-2.jpg",
      "/musicians/luna-llena/foto-3.jpg",
    ],
    setlist: [
      "A Prueba de Fuego — Grupo Niche",
      "Qué Le Den Candela — Celia Cruz",
      "Lo Qué Dijo La Gitana — Ismael Rivera",
      "La Luna — Luna Llena Salsa",
      "Merecumbé — Johnny Colón",
      "Tú Con Él — Frankie Ruíz",
      "Que Vuelva El Amor — Luna Llena Salsa Band",
      "Homenaje a la Ponceña — Grupo Galé",
      "Tributo a la reina — Melina Almadovar (Celia Cruz)",
      "Cali Pachanguero 40 años — Grupo Niche",
      "Ponte En Ritmo — Versión Luna Llena Salsa",
      "Estamos En Salsa — Wayne Gorbea",
      "Mi Alma Llora — Luna Llena Salsa",
      "Anamilé — Grupo Niche",
      "Trucutú — Mixtura Band Tonny Succar",
      "Corazón Dispuesto — Luna Llena Salsa Band",
      "Timbalero — El Gran Combo",
      "Uno Se Cura — Raulín Rosendo",
      "Idilio — Willie Colón",
      "Tal Vez Vuelvas — Versión Luna Llena Salsa",
      "Pa Bravo Yo — Justo Betancourt",
      "Indestructible — Ray Barretto",
      "No Hay Cama Pa Tanta Gente — El Gran Combo",
      "La Fiesta De Pilito — El Gran Combo",
      "Aires de Navidad — Hector Lavoe",
      "Y Cada Vez — Luna Llena Salsa",
      "Qué Alguien Me Diga — Gilberto Santarosa",
      "Ruperto Mena — Grupo Niche",
      "Canción (De Qué Callada Manera) — Sonora Ponceña",
      "Plástico — Ruben Blades",
    ],
    city: "Bogotá",
    createdAt: "2026-06-01",
  },
];

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
