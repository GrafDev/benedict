import {create} from "zustand";
import {IModalStore} from "../../types.ts";

export const useModal = create<IModalStore>((set, get) => ({
    isOpen: false,
    toggleModal: () => set({isOpen: !get().isOpen}),
}))