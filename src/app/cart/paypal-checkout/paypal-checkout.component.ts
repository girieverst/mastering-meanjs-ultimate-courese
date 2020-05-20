declare let paypal: any;
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartItem } from "@core/cart/cart-item";
import { getCartItems, getOrderTotal } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { OrderService } from "@core/orders/order.service";
import { combineLatest, Subscription } from "rxjs";
import { CartService } from "../../core/cart/cart.service";

@Component({
  selector: "pm-paypal-checkout",
  templateUrl: "./paypal-checkout.component.html",
  styleUrls: ["./paypal-checkout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalCheckoutComponent implements OnInit {
  addScript: boolean = false;
  paypalLoad: boolean = true;
  orderTotal: number = 0;
  orderTotalSubscription: Subscription;
  cartItems: CartItem[];

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartStore: CartStore,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderTotalSubscription = combineLatest(
      this.cartStore.select(getOrderTotal),
      this.cartStore.select(getCartItems)
    ).subscribe(([orderTotal, cartItems]) => {
      console.log("getting order total is: ", orderTotal);
      console.log("getting order total is: ", cartItems);
      this.orderTotal = orderTotal;
      this.cartItems = cartItems as CartItem[];
    });
    paypal.Button.render(this.paypalConfig, "#paypal-button-container");
  }

  ngOnDestroy() {
    if (this.orderTotalSubscription) {
      this.orderTotalSubscription.unsubscribe();
    }
  }

  paypalConfig = {
    style: {
      size: "responsive",
    },
    env: "sandbox",
    client: {
      sandbox:
        "AULe_9leoINkKVQgviERbCi-BzO3oqkKslbUz_2-m0bUrrKWwwy79RJS1FCu58wRMM2Ku7v6o5o1fPLd",
      // production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.orderTotal, currency: "USD" } },
          ],
        },
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        const { cart: cartId, id: paymentId } = payment;
        const { orderTotal, cartItems } = this;
        console.log("The payment was succeeded", payment);
        this.orderService
          .submitOrder({ cartId, cartItems, orderTotal, paymentId })
          .subscribe((order) => {
            console.log(`Redirect to Thank you page pending`, order);
            this.cartService.clearCart();
            this.router.navigate(["orders/success"]);
          });
      });
    },
    onCancel: (data) => {
      console.log("The payment was cancelled", data);
    },
    onError: (data) => {
      console.log("Payment Error", data);
    },
  };
}
