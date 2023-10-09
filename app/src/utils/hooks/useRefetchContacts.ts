import { create } from "zustand";

export interface RefetchState {
  isRefetch: boolean;
  refetch: () => void;
  killRefetch: () => void;
}

export const useRefetchContacts = create<RefetchState>()((set) => ({
  isRefetch: false,
  refetch: () => set({ isRefetch: true }),
  killRefetch: () => set({ isRefetch: false }),
}));
