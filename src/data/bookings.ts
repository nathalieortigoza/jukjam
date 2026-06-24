export type BookingStatus = "pendiente" | "cancelado" | "completado";

export interface Booking {
  id: string;
  eventName: string;
  date: string;
  time: string;
  address: string;
  musicianId: string;
  musicianName: string;
  musicianPhoto: string;
  packageName: string;
  price: number;
  confirmCode: string;
  status: BookingStatus;
  createdAt: string;
}

const KEY = "jukjam_bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  const all = getBookings();
  const idx = all.findIndex((x) => x.id === b.id);
  if (idx >= 0) all[idx] = b;
  else all.unshift(b);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function cancelBooking(id: string) {
  const all = getBookings().map((b) =>
    b.id === id ? { ...b, status: "cancelado" as BookingStatus } : b
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

// Seed mock events so the dashboard isn't empty on first load
export function seedMockBookings() {
  if (getBookings().length > 0) return;
  const mocks: Booking[] = [
    {
      id: "mock-1",
      eventName: "Cena de aniversario empresa",
      date: "2026-08-15",
      time: "19:00",
      address: "Cra 11 #93-52, Bogotá",
      musicianId: "luna-llena-salsa-band",
      musicianName: "Luna Llena Salsa Band",
      musicianPhoto: "/musicians/luna-llena/foto-1.jpg",
      packageName: "Show Corporativo",
      price: 3000000,
      confirmCode: "XKT9F2",
      status: "pendiente",
      createdAt: "2026-06-20",
    },
    {
      id: "mock-2",
      eventName: "Cumpleaños de Sofía",
      date: "2026-05-10",
      time: "20:00",
      address: "Cl 85 #19-12, Bogotá",
      musicianId: "luna-llena-salsa-band",
      musicianName: "Luna Llena Salsa Band",
      musicianPhoto: "/musicians/luna-llena/foto-1.jpg",
      packageName: "Show Privado",
      price: 1800000,
      confirmCode: "R3MZ8A",
      status: "completado",
      createdAt: "2026-04-28",
    },
  ];
  localStorage.setItem(KEY, JSON.stringify(mocks));
}
