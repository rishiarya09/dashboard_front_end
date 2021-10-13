import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../AuthService/auth-service.service";
import { ShopServiceService } from "../../shop-service/shop-service.service";
import { User } from "src/app/user";
import { CommonService } from "../../common/common.service";
import { AlertService } from "../../alert-service/alert.service";

@Component({
  selector: "app-shop-create",
  templateUrl: "./shop-create.component.html",
  styleUrls: ["./shop-create.component.css"],
})
export class ShopCreateComponent implements OnInit {
  shop_id: string; // shop id from salesman after login
  salesmen_id; // salesman id from salesman after login
  role: string;
  errorMessage;
  user: User;
  createUser: User;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    private router: Router,
    private Auth: AuthServiceService,
    private cservice: CommonService,
    private shopService: ShopServiceService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.Activate();
  }
  Activate() {
    // get all shops here
    // this.Auth.getUsers(this.salesmen_id).subscribe((data) => {
    //   this.user = data;
    // });
  }
  logout() {
    this.Auth.logout();
    this.router.navigate(["/login"]);
  }
}
