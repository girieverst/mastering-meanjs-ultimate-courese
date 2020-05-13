import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CartSummaryComponent } from './cart-summary/cart-summary.component';

@NgModule({
  declarations: [ShoppingCartComponent, CartSummaryComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
