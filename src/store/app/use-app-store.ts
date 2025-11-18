import { Practice } from "@/lib";
import { create } from "zustand";

type AppStore = {
  activePractice: Practice | undefined;
};

type AppStoreActions = {
  setActivePractice: (practice: Practice) => void;
};

export const useAppStore = create<AppStore & AppStoreActions>((set) => ({
  activePractice: undefined,
  setActivePractice: (activePractice) => set({ activePractice }),
}));
