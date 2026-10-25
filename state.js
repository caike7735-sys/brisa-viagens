import { destinations } from "./data.js";
const validIds = new Set(destinations.map((destination) => destination.id));
function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem("brisa-favorites") || "[]");
    return Array.isArray(stored)
      ? [...new Set(stored.filter((id) => validIds.has(id)))]
      : [];
  } catch {
    return [];
  }
}
export const state = {
  favorites: readFavorites(),
  category: "all",
  query: "",
  favoritesOnly: false,
  showAll: false,
};
export function toggleFavorite(id) {
  if (!validIds.has(id)) return null;
  const saved = !state.favorites.includes(id);
  state.favorites = saved
    ? [...state.favorites, id]
    : state.favorites.filter((value) => value !== id);
  let persisted = true;
  try {
    localStorage.setItem("brisa-favorites", JSON.stringify(state.favorites));
  } catch {
    persisted = false;
  }
  return { saved, persisted };
}
export function clearLegacyEmail() {
  try {
    localStorage.removeItem("brisa-newsletter-email");
  } catch {
    /* Storage may be disabled. */
  }
}
