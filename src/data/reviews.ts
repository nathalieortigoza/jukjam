export interface StoredReview {
  id: string;
  bookingId: string;
  musicianId: string;
  buyerName: string;
  buyerInitials: string;
  rating: number;
  text: string;
  date: string;
}

const KEY = "jukjam_reviews";

export function getReviews(): StoredReview[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveReview(r: StoredReview): void {
  const all = getReviews();
  all.unshift(r);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function hasReviewed(bookingId: string): boolean {
  return getReviews().some((r) => r.bookingId === bookingId);
}

export function getReviewsForMusician(musicianId: string): StoredReview[] {
  return getReviews().filter((r) => r.musicianId === musicianId);
}
