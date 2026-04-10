import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavStore } from "@/types";

export const useFavStore = create<FavStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (productId: number) =>
        set((state) => {
          const isFav = state.favorites.includes(productId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== productId)
              : [...state.favorites, productId],
          };
        }),

      isFavorite: (productId: number) => get().favorites.includes(productId),
    }),
    { name: "fav-storage" }
  )
);
