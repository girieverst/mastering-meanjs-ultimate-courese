import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { PaypalCheckoutComponent } from './paypal-checkout/paypal-checkout.component';
import { PaymentService } from './paypal-checkout/payment.service';

@NgModule({
  declarations: [ShoppingCartComponent, CartSummaryComponent, PaypalCheckoutComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
 
})
export class CartModule {}
