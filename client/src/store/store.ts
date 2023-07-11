import { create } from "zustand";
import { AuthStoreInterface } from "../types/zustand.ts";

export const useAuthStore = create<AuthStoreInterface>((set) => {
  return {
    auth: {
      username: "",
      active: false,
    },
    setUsername: (name) =>
      set((state) => ({ auth: { ...state.auth, username: name } })),
  };
});
