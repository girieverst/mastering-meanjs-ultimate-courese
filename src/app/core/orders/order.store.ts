import { Injectable } from "@angular/core";
import { LogService } from "@core/log.service";
import { Store } from "@core/store";
import { Order } from "./order";
import { initialState, OrderState } from "./order.state";

@Injectable({ providedIn: "root" })
export class OrderStore extends Store<OrderState> {
  constructor(private logService: LogService) {
    super(initialState);
  }

  addOrder = (orderToCreate: Order) => {
    this.logService.log("[Orders] Add Order", orderToCreate);

    this.setState({
      ...this.state,
      orders: [].concat(this.state.orders, orderToCreate),
    });
  };

  clearOrder = () => {
    this.logService.log("[Orders] Clear");

    this.setState(initialState);
  };
}
