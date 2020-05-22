import { createSelector } from "reselect";
import { OrderState } from "./order.state";

export const getOrders = (state: OrderState) => state.orders;

export const getOrderById = (orderId: string) =>
  createSelector(getOrders, (orders) =>
    orders.filter((order) => order.orderId === orderId).pop()
  );
