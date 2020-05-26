import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { Order } from "@core/orders/order";
import { getOrders } from "@core/orders/order.selector";
import { OrderService } from "@core/orders/order.service";
import { OrderStore } from "@core/orders/order.store";
import { Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "pm-order-history-page",
  templateUrl: "./order-history-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryPageComponent implements OnInit {
  fetchOrderHistory$: Observable<any>;
  orderHistory$: Observable<Order[]>;
  orderHistorySubscription: Subscription;
  orderHistory: Order[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private orderStore: OrderStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderHistory$ = this.orderService
      .getOrdersByUserId(this.authService.userId$)
      .pipe(switchMap((_) => this.orderStore.select(getOrders)));
  }

  navigateOrderDetails(orderId: string) {
    this.router.navigate(["../order-details", orderId], {
      relativeTo: this.route,
    });
  }
}
