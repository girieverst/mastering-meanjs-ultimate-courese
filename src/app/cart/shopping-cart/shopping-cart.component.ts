import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { getCartItems, getCartItemsCount } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { Observable } from "rxjs";
import { CartItem } from "../../core/cart/cart-item";
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from "../../core/cart/cart.service";

@Component({
  selector: "pm-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Observable<CartItem[]>;

  cartItemsCount: Observable<number>;
  displayedColumns = ["imgUrl", "name", "price", "quantity", "remove"];
  availableQuantities: number[];

  constructor(private cartService: CartService, private cartStore: CartStore) {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
  }

  ngOnInit() {
    this.cartItems = this.cartStore.select(getCartItems);
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
  }
}
