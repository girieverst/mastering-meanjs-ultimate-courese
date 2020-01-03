import { TestBed } from "@angular/core/testing";

import { ProductDataService } from "./product-data.service";
import { HttpClientModule } from "@angular/common/http";

describe("ProductDataService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ProductDataService],
      imports: [HttpClientModule]
    })
  );

  it("should be created", () => {
    const service: ProductDataService = TestBed.get(ProductDataService);
    expect(service).toBeTruthy();
  });
});
