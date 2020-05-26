import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Order } from "@core/orders/order";

@Component({
  selector: "pm-placed-order",
  templateUrl: "./placed-order.component.html",
  styleUrls: ["./placed-order.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacedOrderComponent implements OnInit {
  @Input()
  order: Order;

  @Output()
  navigateOrderDetails = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  goToOrderDetailsPage() {
    this.navigateOrderDetails.emit(this.order.orderId);
  }
}
