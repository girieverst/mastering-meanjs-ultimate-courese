import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Order } from "@core/orders/order";
import { User } from '@core/user';

@Component({
  selector: "pm-thank-you",
  templateUrl: "./thank-you.component.html",
  styleUrls: ["./thank-you.component.scss"],
})
export class ThankYouComponent implements OnInit {
  constructor() {

  }

  @Input()
  order: Order;

  @Input()
  user: User;

  @Output()
  routeToShoppingPage = new EventEmitter();

  @Output()
  routeToOrderDetailPage = new EventEmitter<string>();

  ngOnInit() {}

  get deliveryDate() {
    return new Date();
  }

  get userName() {
    return "Rupesh Tiwari";
  }

  get items(): any[] {
    return [{ name: "orange", imgUrl: "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0"}, { name: "apple", imgUrl:"https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0" }];
  }

  get orderNumber(): string {
    return "123";
  }
}
