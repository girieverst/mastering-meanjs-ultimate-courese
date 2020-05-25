import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { CartItem } from "@core/cart/cart-item";
import { LogService } from "@core/log.service";
import { Observable, of, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Order } from "./order";
import { OrderStore } from "./order.store";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private apiUrl = "/api/orders/";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private logService: LogService,
    private orderStore: OrderStore
  ) {}

  submitOrder({
    cartId,
    paymentId,
    orderTotal,
    cartItems,
  }: {
    cartId: string;
    paymentId: string;
    orderTotal: number;
    cartItems: CartItem[];
  }) {
    var today = new Date();
    var after7Days = new Date();
    after7Days.setDate(today.getDate() + 1);

    const user = this.authService.loggedInUser;
    const order = new Order(
      user.id,
      orderTotal,
      after7Days,
      user.fullname,
      cartItems,
      cartId,
      paymentId
    );

    return this.httpClient.post(`${this.apiUrl}submit`, order).pipe(
      tap((order: any) => {
        this.logService.log("Order created successfully", order);
      }),
      switchMap((order: any) => of(order._id)),
      catchError((e) => {
        this.logService.log(`Server Error Occurred: ${e.error.message} `, e);
        return throwError(
          `Your Order could not be submitted now please try again`
        );
      })
    );
  }

  getOrder(orderId: string) {
    return this.httpClient.get(`${this.apiUrl}${orderId}`).pipe(
      switchMap((order: any) => {
        const createdOrder = { ...order, orderId: order._id };
        this.logService.log("Order created successfully", createdOrder);
        this.orderStore.addOrder(createdOrder);
        return of(createdOrder.orderId);
      }),
      catchError((e) => {
        this.logService.log(`Server Error Occurred: ${e.error.message} `, e);
        return throwError(
          `Your Order could not be fetched now please try again`
        );
      })
    );
  }

  getOrdersByUserId(userId$: Observable<string>) {
    return userId$.pipe(
      switchMap((userId) =>
        this.httpClient.get(`${this.apiUrl}/userid/${userId}`)
      ),
      tap((orders: Order[]) => this.orderStore.addMultipleOrders(orders)),
      catchError((e) => this.onError(e))
    );
  }

  private onError(e) {
    this.logService.log(`Server Error Occurred`, e);
    return throwError(`Server error occurred please try again`);
  }
}
