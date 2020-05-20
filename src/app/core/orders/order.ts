import { CartItem } from "@core/cart/cart-item";

export class Order {
  constructor(
    public userId: string,
    public orderTotal: Number,
    public deliveryDate: Date,
    public shippingAddress: string,
    public itemList: CartItem[],
    public cartId: string,
    public paymentId: string
  ) {}
}
