import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this.showSnackBar));
  }

  private showSnackBar = (response: HttpErrorResponse): Observable<never> => {
    let text = "";
    if (response.error) {
      text = response.error;
    } else if (response.message) {
      text = response.message;
    } else {
      text = response.error.statusText;
    }

    if (text) {
      this.snackBar.open(text, "Close", {
        duration: 2000,
      });
    }

    return throwError(response);
  };
}
