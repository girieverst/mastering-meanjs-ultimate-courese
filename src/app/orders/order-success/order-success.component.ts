import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CartItem } from "@core/cart/cart-item";
import { Order } from "@core/orders/order";
import { User } from "@core/user";

@Component({
  selector: "pm-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSuccessComponent {
  @Input()
  order: Order;
  @Input()
  user: User;

  @Output()
  routeToShoppingPage = new EventEmitter();

  @Output()
  routeToOrderDetailPage = new EventEmitter<string>();

  get deliveryDate() {
    return this.order.deliveryDate;
  }

  get userName() {
    return this.user.fullname;
  }

  get items(): CartItem[] {
    return this.order.itemList;
  }

  get orderNumber(): string {
    return this.order.orderId;
  }
}
