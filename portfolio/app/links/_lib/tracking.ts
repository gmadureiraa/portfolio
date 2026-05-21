const STORAGE_KEY = "madureira-links-clicks";

export interface ClickData {
  [linkId: string]: number;
}

export function getClicks(): ClickData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function trackClick(linkId: string): void {
  if (typeof window === "undefined") return;
  try {
    const data = getClicks();
    data[linkId] = (data[linkId] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silent fail
  }
}

export function getTotalClicks(): number {
  const data = getClicks();
  return Object.values(data).reduce((sum, count) => sum + count, 0);
}
