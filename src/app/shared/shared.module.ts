import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddToCartDialogComponent } from "./cart/add-to-cart-dialog/add-to-cart-dialog.component";
import { AddToCartComponent } from "./cart/add-to-cart/add-to-cart.component";
import { CartItemsCountComponent } from "./cart/cart-items-count/cart-items-count.component";
import { PmMaterialModule } from "./material-module";
import { SharedRoutingModule } from "./shared-routing.module";
import { AddToCartDialogComponent } from './cart/add-to-cart-dialog/add-to-cart-dialog.component';

@NgModule({
  declarations: [
    CartItemsCountComponent,
    AddToCartComponent,
    AddToCartDialogComponent,
  ],
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
  entryComponents: [AddToCartDialogComponent],
})
export class SharedModule {}
