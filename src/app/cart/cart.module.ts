import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
