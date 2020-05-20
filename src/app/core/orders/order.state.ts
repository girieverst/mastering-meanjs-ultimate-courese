import { Order } from "./order";

export interface OrderState {
  orders: Order[];
}

export const initialState = { orders: [] };
