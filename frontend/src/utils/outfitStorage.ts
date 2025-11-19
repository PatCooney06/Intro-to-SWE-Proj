function getCurrentUser(): { email: string; name?: string } | null {
  try {
    const raw = localStorage.getItem("smartfit_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export interface ClothingItem {
  id: number;
  name: string;
  imgUrl: string;
}

export interface SavedOutfit {
  id: string;
  top: ClothingItem;
  bottom: ClothingItem;
  shoe: ClothingItem;
  timestamp: string;
  isFavorite: boolean;
}

export interface UserPoints {
  total: number;
  streak: number;
  lastLoggedDate: string | null;
}

const STORAGE_KEY_PREFIX = "smartfit_outfits_";
const POINTS_KEY_PREFIX = "smartfit_points_";
const POINTS_UPDATED_EVENT = "pointsUpdated";
export const OUTFITS_UPDATED_EVENT = "outfitsUpdated";

function getUserKey(prefix: string): string | null {
  const user = getCurrentUser();
  return user && user.email ? prefix + user.email : null;
}

export function getSavedOutfits(): SavedOutfit[] {
  const key = getUserKey(STORAGE_KEY_PREFIX);
  if (!key) return [];
  try {
    const json = localStorage.getItem(key);
    const outfits: SavedOutfit[] = json ? JSON.parse(json) : [];
    return outfits.map(o => ({
        ...o,
        isFavorite: o.isFavorite === undefined ? false : o.isFavorite
    }));
  } catch (err) {
    console.error("Failed to load outfits:", err);
    return [];
  }
}

export function getFavoriteOutfits(): SavedOutfit[] {
  return getSavedOutfits().filter(outfit => outfit.isFavorite);
}

export function saveNewOutfit(
  newOutfit: Omit<SavedOutfit, "id" | "isFavorite">
): SavedOutfit[] {
  const key = getUserKey(STORAGE_KEY_PREFIX);
  if (!key) return [];

  const currentOutfits = getSavedOutfits();
  const outfitWithMetadata: SavedOutfit = {
    ...newOutfit,
    id: Date.now().toString(),
    isFavorite: false, 
  };

  currentOutfits.unshift(outfitWithMetadata); 
  localStorage.setItem(key, JSON.stringify(currentOutfits));

  updateUserPoints(3); 

  window.dispatchEvent(new Event(OUTFITS_UPDATED_EVENT));

  return currentOutfits;
}

export function toggleOutfitFavorite(outfitId: string): SavedOutfit[] {
  const key = getUserKey(STORAGE_KEY_PREFIX);
  if (!key) return [];
  const outfits = getSavedOutfits();
  const updated = outfits.map((o) =>
    o.id === outfitId ? { ...o, isFavorite: !o.isFavorite } : o
  );
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
}

export function getUserPoints(): UserPoints {
  const key = getUserKey(POINTS_KEY_PREFIX);
  if (!key)
    return { total: 0, streak: 0, lastLoggedDate: null };
  try {
    const json = localStorage.getItem(key);
    return json
      ? (JSON.parse(json) as UserPoints)
      : { total: 0, streak: 0, lastLoggedDate: null };
  } catch {
    return { total: 0, streak: 0, lastLoggedDate: null };
  }
}

export function updateUserPoints(pointsToAdd: number): UserPoints {
  const key = getUserKey(POINTS_KEY_PREFIX);
  if (!key)
    return { total: 0, streak: 0, lastLoggedDate: null };

  const points = getUserPoints();
  const today = new Date().toDateString();

  if (points.lastLoggedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (points.lastLoggedDate === yesterday.toDateString()) {
      points.streak += 1;
    } else {
      points.streak = 1;
    }

    points.total += 1;
    points.lastLoggedDate = today;
  }

  points.total += pointsToAdd;
  localStorage.setItem(key, JSON.stringify(points));
  
  window.dispatchEvent(new Event(POINTS_UPDATED_EVENT)); 
  
  return points;
}