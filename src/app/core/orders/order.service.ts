import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { CartItem } from "@core/cart/cart-item";
import { LogService } from "@core/log.service";
import { of, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { Order } from "./order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private apiUrl = "/api/orders/";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private logService: LogService
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
      switchMap((newOrder) => {
        this.logService.log("Order submitted successfully", newOrder);
        return of(newOrder);
      }),
      catchError((e) => {
        this.logService.log(`Server Error Occurred: ${e.error.message} `, e);
        return throwError(
          `Your Order could not be submitted now please try again`
        );
      })
    );
  }
}
