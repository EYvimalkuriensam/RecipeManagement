import { User } from "./../models/user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponseData } from "../interface/authResponse.interface";
import { catchError, tap } from "rxjs/operators";
import { throwError, Observable, BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private api_key: string = environment.FIREBASE_API_KEY;
  private signupURI: string = environment.FIREBASE_SIGNUP_URI + this.api_key;
  private signinURI: string = environment.FIREBASE_SIGNIN_URI + this.api_key;
  userSub = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signupURI, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login = (email: string, password: string): Observable<AuthResponseData> =>
    this.http
      .post<AuthResponseData>(this.signinURI, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );

  autoLogin = () => {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.userSub.next(loadedUser);
      this.autoLogout(expirationDuration);
    }
  };

  logout = (): void => {
    this.userSub.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  };

  autoLogout = (expirationDuration: number): void => {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  };

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSub.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured";
    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
        errorMessage = "Authentication Failed";
        break;
    }
    return throwError(errorMessage);
  }
}
