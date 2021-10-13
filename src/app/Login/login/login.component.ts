import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "../../AuthService/auth-service.service";
import { Login } from "../../login";
import { Router } from "@angular/router";
import { CommonService } from "../../common/common.service";
import { AlertService } from "../../alert-service/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private array: Login[];
  username;
  password;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private apicall: AuthServiceService,
    public router: Router,
    private cservice: CommonService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.Activate();
  }
  async Activate() {
    // this.router.navigate(["/enquiry-list"]);
  }
  submit() {
    console.log("clicked");
    if (this.username && this.password) {
      let reg_email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
      let reg_password = "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
      if (!this.username.match(reg_email)) {
        this.alertService.error("Enter Valid Email", this.options);
      }
      // else if (!this.password.match(reg_password)) {
      //   this.alertService.error(
      //     "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
      //     this.options
      //   );
      // }
      else {
        this.apicall.login(this.username, this.password).subscribe(
          (e) => {
            this.cservice.setUserDetails(e.shop_id, e._id, e.role); // salesmen id
            if (e.role == "m") {
              this.router.navigate(["/profile-create"]);
            } else if (e.role == "a") {
              this.router.navigate(["/staffCreate"]);
            } else {
              this.router.navigate(["/enquiry-list"]);
            }
          },
          (err) => {
            this.alertService.error(err.error.message, this.options);
          }
        );
      }
    } else {
      this.alertService.error(
        "please enter the username and password",
        this.options
      );
    }
  }
}
