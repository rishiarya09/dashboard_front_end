import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  s_id: String;
  shop_id: string;
  salesmen_id: String;

  Setsid(id: String) {
    this.s_id = id;
  }
  getsid() {
    return this.s_id;
  }

  setUserDetails(shop_id: string, salesman_id: string, role: string) {
    localStorage.setItem("shop_id", shop_id);
    localStorage.setItem("salesmen_id", salesman_id);
    localStorage.setItem("role", role);
  }

  getUserDetails() {
    let details = {
      shop_id: localStorage.getItem("shop_id"),
      salesmen_id: localStorage.getItem("salesmen_id"),
      role: localStorage.getItem("role"),
    };

    return details;
  }
}
