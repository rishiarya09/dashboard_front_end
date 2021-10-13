import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Billing } from "./billing";
import { Login } from "./login";
import { Observable, throwError } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class ApiCallsService {
  // private api_url = 'https://api.juturu.online';
  private api_url = "http://localhost:4000";
  constructor(private http: HttpClient) {}
  // getBillings(s_id, date): Promise<Billing[]> {
  //   return this.http.get<Billing[]>(this.api_url + '/api/billing/?s_id=' + s_id + '&date=' + date).toPromise();
  // }
  getBillings(s_id, date): Observable<Billing[]> {
    return this.http.get<Billing[]>(
      this.api_url + "/api/billing/?s_id=" + s_id + "&date=" + date
    );
  }
  createBill(bill): Promise<Billing[]> {
    return this.http
      .post<Billing[]>(this.api_url + "/api/billing", bill)
      .toPromise();
  }
  updateBill(bill): Promise<Billing[]> {
    return this.http
      .put<Billing[]>(this.api_url + "/api/billing/" + bill._id, bill)
      .toPromise();
  }
}
