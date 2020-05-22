import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "@angular/flex-layout";
import { SharedModule } from "@shared/shared.module";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrderSuccessPageComponent } from './order-success-page/order-success-page.component';

@NgModule({
  declarations: [OrderSuccessComponent, OrderSuccessPageComponent],
  imports: [CommonModule, OrdersRoutingModule, CoreModule, SharedModule],
})
export class OrdersModule {}
