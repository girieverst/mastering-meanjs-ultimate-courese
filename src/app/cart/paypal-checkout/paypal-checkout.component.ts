declare let paypal: any;
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getOrderTotal } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { Subscription } from "rxjs";
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
  orderTotalToCharge: number = 0;
  orderTotalSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartStore: CartStore
  ) {}

  ngOnInit() {
    this.orderTotalSubscription = this.cartStore
      .select(getOrderTotal)
      .subscribe((orderTotal: number) => {
        console.log("getting order total is: ", orderTotal);
        this.orderTotalToCharge = orderTotal;
      });
  }

  ngOnDestroy() {
    if (this.orderTotalSubscription) {
      this.orderTotalSubscription.unsubscribe();
    }
  }

  private addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve) => {
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "#paypal-button-container");
        this.paypalLoad = false;
      });
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
            { amount: { total: this.orderTotalToCharge, currency: "USD" } },
          ],
        },
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log("The payment was succeeded", payment);
        this.cartService.clearCart();
        this.router.navigate(["products"]);
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
