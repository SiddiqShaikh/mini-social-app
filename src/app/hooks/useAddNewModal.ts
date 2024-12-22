import { create } from "zustand";

interface AddNewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useAddNewModal = create<AddNewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddNewModal;
