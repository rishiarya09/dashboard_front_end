import { Injectable } from "@angular/core";
import { Shop } from "../shop";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ShopServiceService {
  getShopsList: Shop;
  constructor(private http: HttpClient) {}
  private api_url = "http://localhost:8000";

  getShops(): Observable<Shop> {
    return this.http.get<Shop>(this.api_url + "api/getShops").pipe(
      tap((res) => {
        return (this.getShopsList = res);
      }),
      shareReplay()
    );
  }
}
