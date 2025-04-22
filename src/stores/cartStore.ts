import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      const updatedItems = state.items.map((i) => 
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
      
      return {
        items: updatedItems,
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price * item.quantity,
      };
    }
    
    return {
      items: [...state.items, { ...item, quantity: item.quantity }],
      totalItems: state.totalItems + item.quantity,
      totalPrice: state.totalPrice + item.price * item.quantity,
    };
  }),
  
  removeItem: (id) => set((state) => {
    const itemToRemove = state.items.find((i) => i.id === id);
    
    if (!itemToRemove) return state;
    
    return {
      items: state.items.filter((i) => i.id !== id),
      totalItems: state.totalItems - itemToRemove.quantity,
      totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
    };
  }),
  
  updateQuantity: (id, quantity) => set((state) => {
    const item = state.items.find((i) => i.id === id);
    
    if (!item) return state;
    
    const quantityDiff = quantity - item.quantity;
    
    return {
      items: state.items.map((i) => 
        i.id === id ? { ...i, quantity } : i
      ),
      totalItems: state.totalItems + quantityDiff,
      totalPrice: state.totalPrice + (quantityDiff * item.price),
    };
  }),
  
  clearCart: () => set({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  }),
}));
