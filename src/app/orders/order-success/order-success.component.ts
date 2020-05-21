import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pm-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.scss"],
})
export class OrderSuccessComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  get deliveryDate() {
    return new Date();
  }

  get userName() {
    return "Rupesh Tiwari";
  }

  get items(): any[] {
    return [{ name: "orange" }, { name: "apple" }];
  }

  get orderNumber(): string {
    return "123";
  }
}
