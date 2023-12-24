import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

/**
 * @description search hook using redux to manage documents
 */
export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  toggle: () =>
    set({
      isOpen: !get().isOpen,
    }),
}));
