import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "@angular/flex-layout";
import { SharedModule } from "@shared/shared.module";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { OrdersRoutingModule } from "./orders-routing.module";

@NgModule({
  declarations: [OrderSuccessComponent],
  imports: [CommonModule, OrdersRoutingModule, CoreModule, SharedModule],
})
export class OrdersModule {}
