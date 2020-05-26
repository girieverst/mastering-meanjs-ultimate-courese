import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { OrderDetailsPageComponent } from "./order-details/order-details-page/order-details-page.component";
import { OrderDetailsComponent } from "./order-details/order-details/order-details.component";
import { OrderHistoryPageComponent } from "./order-history/order-history-page/order-history-page.component";
import { PlacedOrderComponent } from "./order-history/placed-order/placed-order.component";
import { OrderSuccessPageComponent } from "./order-success/order-success-page/order-success-page.component";
import { ThankyouComponent } from "./order-success/thank-you/thank-you.component";
import { OrdersRoutingModule } from "./orders-routing.module";

@NgModule({
  declarations: [
    ThankyouComponent,
    OrderSuccessPageComponent,
    OrderHistoryPageComponent,
    PlacedOrderComponent,
    OrderDetailsPageComponent,
    OrderDetailsComponent,
  ],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
