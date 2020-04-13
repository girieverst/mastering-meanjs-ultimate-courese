import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ProductDataService } from "../core/products/product-data.service";
import { PmMaterialModule } from "../shared/material-module";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products/products.component";


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    PmMaterialModule,
    SharedModule,
  ],
  providers: [ProductDataService],
})
export class ProductsModule {}
