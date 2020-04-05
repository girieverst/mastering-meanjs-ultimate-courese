import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { getIsItemAlreadyInCart } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from "@core/cart/cart.service";
import { Product } from "@core/products/product";
import { Observable } from "rxjs";

@Component({
  selector: "pm-add-to-cart",
  templateUrl: "./add-to-cart.component.html",
  styleUrls: ["./add-to-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartComponent implements OnInit {
  @Input() product: Product;
  availableQuantities: number[];
  quantity: number;
  isItemAlreadyInCart: Observable<boolean>;

  constructor(private cartStore: CartStore, private cartService: CartService) {}

  ngOnInit() {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.quantity = 1;
    this.isItemAlreadyInCart = this.cartStore.select(
      getIsItemAlreadyInCart(this.product.id)
    );
    this.isItemAlreadyInCart.subscribe((s) => {
      console.log("itemexisit", s);
    });
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe((cartItem) => {});
  }
}
