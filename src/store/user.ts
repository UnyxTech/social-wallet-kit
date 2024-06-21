import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface UserInfoState {
  address?: string | undefined;
}

interface UserAction {
  setAddress: (token: UserInfoState["address"]) => void;
}

export const useUserStore = create<UserInfoState & UserAction>()(
  devtools(
    persist(
      (set) => ({
        address: undefined,
        setAddress: (address: UserInfoState["address"]) => set({ address }),
      }),
      {
        name: "user-address",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
