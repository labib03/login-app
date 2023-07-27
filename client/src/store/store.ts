import { create } from "zustand";
import { AuthStoreInterface } from "../types/zustand.type.ts";

export const useAuthStore = create<AuthStoreInterface>((set) => {
  return {
    auth: {
      userName: "",
      active: false,
    },
    setUsername: (name) =>
      set((state) => ({ auth: { ...state.auth, userName: name } })),
  };
});
