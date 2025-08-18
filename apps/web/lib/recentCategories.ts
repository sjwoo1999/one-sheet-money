import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RecentCategory = { name: string; lastUsed: number };

type RecentCategoriesState = {
  categories: RecentCategory[];
  add: (name: string) => void;
  list: (limit?: number) => string[];
};

export const useRecentCategories = create<RecentCategoriesState>()(
  persist(
    (set, get) => ({
      categories: [],
      add: (name: string) => {
        const now = Date.now();
        const map = new Map<string, RecentCategory>();
        for (const c of get().categories) map.set(c.name, c);
        map.set(name, { name, lastUsed: now });
        const next = Array.from(map.values())
          .sort((a, b) => b.lastUsed - a.lastUsed)
          .slice(0, 8);
        set({ categories: next });
      },
      list: (limit = 6) => get().categories
        .sort((a, b) => b.lastUsed - a.lastUsed)
        .slice(0, limit)
        .map(c => c.name)
    }),
    { name: "osm_recent_categories" }
  )
);
