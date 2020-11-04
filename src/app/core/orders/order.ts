import { CartItem } from "@core/cart/cart-item";

export class Order {
  orderId = ""; // this we will use in angular app
  // that will be mapped to _id from mongo db.
  createdAt = Date.now;
  constructor(
    public userId: string,
    public orderTotal: string,
    public deliveryDate: Date,
    public shippingAddress: string,
    public itemList: CartItem[],
    public cartId: string,
    public paymentId: string,
    public shippingCost: number,
    public itemsCount: number,
    public estimatedTax: number,
    public orderSubTotal: number
  ) {}
}
