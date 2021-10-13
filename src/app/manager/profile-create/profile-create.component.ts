import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../AuthService/auth-service.service";
import { User, userNew } from "src/app/user";
import { CommonService } from "../../common/common.service";
import { AlertService } from "../../alert-service/alert.service";
@Component({
  selector: "app-profile-create",
  templateUrl: "./profile-create.component.html",
  styleUrls: ["./profile-create.component.css"],
})
export class ProfileCreateComponent implements OnInit {
  shop_id = this.cservice.getUserDetails().shop_id; // shop id from salesman after login
  salesmen_id = this.cservice.getUserDetails().salesmen_id; // salesman id from salesman after login
  role: string;
  errorMessage;
  user: User[] = [];
  createUser: userNew;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private router: Router,
    private Auth: AuthServiceService,
    private cservice: CommonService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.Activate();
  }
  async Activate() {
    this.Auth.getUsers(this.salesmen_id).subscribe((data) => {
      this.user = data;
    });
  }
  selectProfile(profile: userNew) {
    this.createUser = profile;
  }
  newUser() {
    let newUser: userNew = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      _id: "",
      shop_id: this.shop_id,
      address: "",
      city: "",
      role: "s",
      phone_no: "",
      view: "n",
      status: "enable",
    };

    this.createUser = newUser;
  }
  close() {
    this.createUser = null;
  }
  async updateProfile() {
    console.log(this.createUser);
    await this.Auth.editUser(this.createUser).subscribe(
      (data) => {
        this.alertService.success("Profile Updated Succesfully", this.options);
        this.createUser = null;
      },
      (err) => {
        this.alertService.error(err, this.options);
      }
    );
  }
  async CreateProfile() {
    await this.Auth.register(this.createUser).subscribe(
      (data) => {
        this.alertService.success("Profile Updated Succesfully", this.options);
        this.createUser = null;
      },
      (err) => {
        this.alertService.error(err, this.options);
      }
    );
  }
  async DisableProfile(profile: userNew) {
    let id = profile._id;
    let profile_body = {
      status: profile.status,
    };
    await this.Auth.disableProfile(id, profile_body).subscribe((data) => {
      this.alertService.success(data.message, this.options);
      this.createUser = null;
    });
  }
  async ResetPassword() {
    let reset_body = {
      password: this.createUser.password,
      confirm_password: this.createUser.confirm_password,
      _id: this.createUser._id,
    };
    await this.Auth.resetPassword(reset_body).subscribe(
      (data) => {
        this.alertService.success("Password Updated Succesfully", this.options);
        this.createUser = null;
      },
      (err) => {
        this.alertService.error(err.error.message, this.options);
      }
    );
  }
  logout() {
    this.Auth.logout();
    this.router.navigate(["/login"]);
  }
}
