import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
  constructor() {}

  ngOnInit() {}
}
