import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { AuthHeaderInterceptorService } from "./interceptors/auth-header-interceptor.service";
import { HttpErrorInterceptorService } from "./interceptors/http-error-interceptor.service";
import { throwIfAlreadyLoaded } from "./utils/module-import-guard";

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
