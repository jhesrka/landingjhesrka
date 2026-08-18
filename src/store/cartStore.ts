import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  features?: string[];
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      isCartOpen: false,
      addItem: (item) =>
        set((state) => {
          // Add the item
          const newItems = [...state.items, item];
          return {
            items: newItems,
            total: newItems.reduce((acc, curr) => acc + curr.price, 0),
            isCartOpen: true, // open cart when adding
          };
        }),
      removeItem: (id) =>
        set((state) => {
          // Just remove the first instance of the item with the given id (or filter out one)
          const index = state.items.findIndex(i => i.id === id);
          if (index > -1) {
            const newItems = [...state.items];
            newItems.splice(index, 1);
            return {
              items: newItems,
              total: newItems.reduce((acc, curr) => acc + curr.price, 0),
            };
          }
          return state;
        }),
      clearCart: () => set({ items: [], total: 0 }),
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    }),
    {
      name: 'jhesrka-cart-storage',
    }
  )
);
