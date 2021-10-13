import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Enquiery } from "../Enquiery";
import { enquery_success } from "../success.model";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EnqueryServiceService {
  constructor(private http: HttpClient) {}
  // private api_url = 'https://api.juturu.online';
  private api_url = "http://localhost:8000";
  private idToken = localStorage.getItem("id_token");
  getEnquiries(s_id, date, apiParms?: HttpParams): Observable<Enquiery[]> {
    var body = { l: "l" };
    if (!apiParms) apiParms = new HttpParams();
    apiParms.append("salesmen_id", s_id).set("date", date);
    return this.http.get<Enquiery[]>(
      this.api_url + "/api/getEnquiries?salesmen_id=" + s_id + "&date=" + date
    );
  }
  getTodaysEnquiries(
    s_id,
    date,
    apiParms?: HttpParams
  ): Observable<Enquiery[]> {
    var body = { l: "l" };
    if (!apiParms) apiParms = new HttpParams();
    apiParms.append("salesmen_id", s_id).append("date", date);
    return this.http.get<Enquiery[]>(
      this.api_url +
        "/api/getTodaysEnquiries?salesmen_id=" +
        s_id +
        "&date=" +
        date
    );
  }

  createQuery(query): Promise<enquery_success> {
    return this.http
      .post<enquery_success>(this.api_url + "/api/createEnquery", query)
      .toPromise();
  }
  updateQuery(salesmen_id, query): Promise<enquery_success> {
    return this.http
      .put<enquery_success>(
        this.api_url + "/api/editEnquery?salesmen_id=" + salesmen_id,
        query
      )
      .toPromise();
  }
}
