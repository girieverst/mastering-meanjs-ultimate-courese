import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Order } from "@core/orders/order";
import { User } from "@core/user";

@Component({
  selector: "pm-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent {
  @Input()
  order: Order;
  @Input()
  user: User;

  constructor() {}

  get totalBeforeTax() {
    return this.order.orderSubTotal + this.order.shippingCost;
  }
}
