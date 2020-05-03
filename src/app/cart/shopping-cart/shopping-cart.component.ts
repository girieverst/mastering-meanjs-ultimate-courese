import { Component, OnInit } from "@angular/core";
import { getCartItemsCount } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { Observable } from "rxjs";

@Component({
  selector: "pm-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  cartItemsCount: Observable<number>;
  constructor(private cartStore: CartStore) {}

  ngOnInit() {
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
  }
}
