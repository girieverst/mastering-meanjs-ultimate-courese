import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { CartItem } from "@core/cart/cart-item";
import { getCartItems } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { map, switchMap, take, tap } from "rxjs/operators";
import { Order } from "./order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private apiUrl = "/api/orders/";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private cartStore: CartStore
  ) {}

  submitOrder(cartId: string, paymentId: string, orderTotal: number) {
    var today = new Date();
    var after7Days = new Date();
    after7Days.setDate(today.getDate() + 1);

    const user = this.authService.loggedInUser;
    return this.cartStore.select(getCartItems).pipe(
      map(
        (cartItems: CartItem[]) =>
          new Order(
            user.id,
            orderTotal,
            after7Days,
            user.fullname,
            cartItems,
            cartId,
            paymentId
          )
      ),
      tap((order) => console.log("submiting order", order)),
      switchMap((order) => this.httpClient.post(`${this.apiUrl}submit`, order)),
      take(1)
    );
  }
}
