
export type CartItem = {
  id: string;
  title: string;
  prices: number[];
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  sizes: number[]
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}