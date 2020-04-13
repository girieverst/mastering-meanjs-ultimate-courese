import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddToCartComponent } from "./cart/add-to-cart/add-to-cart.component";
import { CartItemsCountComponent } from "./cart/cart-items-count/cart-items-count.component";
import { PmMaterialModule } from "./material-module";
import { SharedRoutingModule } from "./shared-routing.module";

@NgModule({
  declarations: [CartItemsCountComponent, AddToCartComponent],
  imports: [CommonModule, SharedRoutingModule, RouterModule, PmMaterialModule],
  exports: [
    PmMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    CartItemsCountComponent,
    AddToCartComponent,
  ],
})
export class SharedModule {}
