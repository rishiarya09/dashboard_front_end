import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../login";
import { User, userNew } from "../user";
import { Observable, throwError } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  private api_url = "http://localhost:8000";

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.api_url + "/api/login", { email, password })
      .pipe(
        tap((res) => {
          this.setSession(res);
          this.refreshToken();
        }),
        shareReplay()
      );
  }
  register(user: userNew): Observable<any> {
    return this.http
      .post<userNew>(this.api_url + "/api/register", { user })
      .pipe(
        tap((res) => {
          return res;
        }),
        shareReplay()
      );
  }
  getUsers(salesman_id: string): Observable<any> {
    return this.http.get<User>(this.api_url + "/api/users/" + salesman_id).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  editUser(user: userNew): Observable<any> {
    return this.http
      .post<userNew>(this.api_url + "/api/editUser", { user })
      .pipe(
        tap((res) => {
          return res;
        }),
        (err) => {
          return err;
        }
      );
  }

  resetPassword(user: any): Observable<any> {
    return this.http
      .post<User>(this.api_url + "/api/resetPassword", { user })
      .pipe(
        tap(
          (res) => {
            return res;
          },
          (err) => {
            return err;
          }
        )
      );
  }

  disableProfile(id: any, status_body: any): Observable<any> {
    return this.http
      .post<any>(this.api_url + "/api/disableProfile/" + id, { status_body })
      .pipe(
        tap(
          (res) => {
            return res;
          },
          (err) => {
            return err;
          }
        )
      );
  }
  TokenCall(): Observable<any> {
    let salesman_id = localStorage.removeItem("salesmen_id");
    return this.http
      .post<any>(this.api_url + "/api/refresh-Token", { salesman_id })
      .pipe(
        tap((res) => {
          this.removeoldtoken();
          this.setSession(res);
          this.refreshToken();
        }),
        shareReplay()
      );
  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, "second");
    localStorage.setItem("id_token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("salesmen_id");
    localStorage.removeItem("shop_id");
    localStorage.removeItem("role");
  }

  removeoldtoken() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  private refreshToken() {
    const refreshTOken = setTimeout(() => {
      this.TokenCall().subscribe();
    }, 1140000);
  }
}
