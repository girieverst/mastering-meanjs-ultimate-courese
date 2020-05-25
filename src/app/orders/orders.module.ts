import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "@angular/flex-layout";
import { SharedModule } from "@shared/shared.module";
import { ThankyouComponent } from "./order-success/thank-you/thank-you.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrderSuccessPageComponent } from './order-success/order-success-page/order-success-page.component';
import { OrderHistoryPageComponent } from './order-history/order-history-page/order-history-page.component';
import { PlacedOrderComponent } from './order-history/placed-order/placed-order.component';

@NgModule({
  declarations: [ThankyouComponent, OrderSuccessPageComponent, OrderHistoryPageComponent, PlacedOrderComponent],
  imports: [CommonModule, OrdersRoutingModule, CoreModule, SharedModule],
})
export class OrdersModule {}
