import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "@core/auth/auth-guard.service";
import { OrderDetailsPageComponent } from "./order-details/order-details-page/order-details-page.component";
import { OrderHistoryPageComponent } from "./order-history/order-history-page/order-history-page.component";
import { OrderSuccessPageComponent } from "./order-success/order-success-page/order-success-page.component";

const routes: Routes = [
  {
    path: "success/:id",
    component: OrderSuccessPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "order-details/:id",
    component: OrderDetailsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "order-history",
    component: OrderHistoryPageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
