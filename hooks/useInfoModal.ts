import { create } from "zustand";

export interface ModalStoreInterface {
  movieId: string | undefined;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ movieId: undefined, isOpen: false }),
}));

export default useInfoModal;
