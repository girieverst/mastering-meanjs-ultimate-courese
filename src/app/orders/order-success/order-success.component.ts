import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { CartItem } from "@core/cart/cart-item";
import { Order } from "@core/orders/order";
import { getOrderById } from "@core/orders/order.selector";
import { OrderService } from "@core/orders/order.service";
import { OrderStore } from "@core/orders/order.store";
import { Observable, Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "pm-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  order: Order;
  orderSubscription: Subscription;
  orderId$: Observable<string>;
  fetchOrderFromServer$: Observable<string>;
  fetchOrderFromStore: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private orderStore: OrderStore,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.orderId$ = this.route.params.pipe(map((params) => params.id));

    this.fetchOrderFromServer$ = this.orderId$.pipe(
      switchMap((orderId) => this.orderService.getOrder(orderId))
    );

    this.fetchOrderFromStore = this.fetchOrderFromServer$.pipe(
      switchMap((orderId: string) =>
        this.orderStore.select(getOrderById(orderId))
      )
    );
  }

  ngOnInit() {
    this.orderSubscription = this.fetchOrderFromStore.subscribe((order: Order) =>
      this.handleOrder(order)
    );
  }
  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

  handleOrder(order: Order) {
    this.order = order;
    if (!this.order) {
      this.router.navigate(["../products"], { relativeTo: this.route });
    }
  }

  get deliveryDate() {
    return this.order.deliveryDate;
  }

  get userName() {
    return this.authService.loggedInUser.fullname;
  }

  get items(): CartItem[] {
    return this.order.itemList;
  }

  get orderNumber(): string {
    return this.order.orderId;
  }
}
