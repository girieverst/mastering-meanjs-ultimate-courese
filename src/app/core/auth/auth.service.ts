import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LogService } from "@core/log.service";
import { BehaviorSubject, EMPTY, of, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { User } from "../user";
import { TokenStorageService } from "./token-storage.service";

interface UserDto {
  user: User;
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(null);
  private apiUrl = "/api/auth/";
  private redirectUrlAfterLogin = "";

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private logService: LogService
  ) {}

  get isUserLoggedIn() {
    return this.user$.value !== null;
  }

  set redirectUrl(url: string) {
    this.redirectUrlAfterLogin = url;
  }

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log("login credentials", loginCredentials);

    return this.httpClient
      .post<UserDto>(`${this.apiUrl}login`, loginCredentials)
      .pipe(
        switchMap(({ user, token }) => {
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log(`user found`, user);
          return of(this.redirectUrlAfterLogin);
        }),
        catchError((e) => {
          this.logService.log(`Server Error Occurred: ${e.error.message} `, e);
          return throwError(
            `Your login details could not be verified. Please try again`
          );
        })
      );
  }

  logout() {
    // remove user from suject
    // remove token from localstorage

    this.tokenStorage.removeToken();
    this.setUser(null);
    console.log("user did logout successfull");
  }

  get user() {
    return this.user$.asObservable();
  }

  register(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSave).pipe(
      switchMap(({ user, token }) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user registered successfully`, user);
        return of(user);
      }),
      catchError((e) => {
        console.log(`server error occured`, e);
        return throwError(`Registration failed please contact to admin`);
      })
    );
  }

  findMe() {
    const token = this.tokenStorage.getToken();
    if (!token) {
      return EMPTY;
    }

    return this.httpClient.get<any>(`${this.apiUrl}findme`).pipe(
      switchMap(({ user, token }) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user found from server:`, user);
        return of(user);
      }),
      catchError((e) => {
        console.log(
          `Your login details could not be verified. Please try again`,
          e
        );
        return throwError(
          `Your login details could not be verified. Please try again`
        );
      })
    );
  }

  private setUser(user) {
    this.user$.next(user);
  }
}
