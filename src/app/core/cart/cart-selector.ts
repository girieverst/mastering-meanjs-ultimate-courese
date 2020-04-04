import { createSelector } from "reselect";
import { CartState } from "./cart-state";

export const getCartItems = (state: CartState) => state.cartItems;

export const getCartItemsCount = (state: CartState) => {
  const cartItems = state.cartItems;
  const totalCartCount = cartItems.reduce(
    (totalCount, currentItem) => totalCount + currentItem.quantity,
    0
  );

  return totalCartCount;
};

export const isItemAlreadyInCart = (state: CartState, productId: number) => {
  return createSelector(getCartItems, (items) => {
    return items.filter((item) => item.productId === productId).length > 0;
  })(state);
};
