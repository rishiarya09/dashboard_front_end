import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../AuthService/auth-service.service";
import { User, userNew,viewStatus } from "src/app/user";
import { CommonService } from "../../common/common.service";
import { AlertService } from "../../alert-service/alert.service";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-profile-create",
  templateUrl: "./profile-create.component.html",
  styleUrls: ["./profile-create.component.css"],
})
export class ProfileCreateComponent implements OnInit {
  @ViewChild('formModel')staffForm:NgForm;
  firstNameError:boolean;
  lastNameError:boolean;
  emailError:boolean;
  passwordError:boolean;
  phoneNumberError:boolean;
  view:string;
  shop_id = this.cservice.getUserDetails().shop_id; // shop id from salesman after login
  salesmen_id = this.cservice.getUserDetails().salesmen_id; // salesman id from salesman after login
  role: string;
  errorMessage;
  user: User[] = [];
  createUser: userNew;
  hideForm:boolean;
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
    console.log(this.view);
  }
  async Activate() {
    this.Auth.getUsers(this.salesmen_id).subscribe((data) => {
      this.user = data;
    });
  }
  public get viewStatus() {
    return viewStatus; 
  }
  selectProfile(profile: userNew) {
    this.view=viewStatus.update;
      this.staffForm.setValue({
        "firstname":profile.first_name,
        "lastname":profile.last_name,
        "email":profile.email,
        "confirmemail":profile.email,
        "password":"",
        "confirmpassword":"",
        "queryAddress":profile.address,
        "city":profile.city,
        "queryphoneno":profile.phone_no
      });
  }

  newUser(submitedForm) {
    let newUser: userNew = {
      first_name: submitedForm.firstname,
      last_name: submitedForm.lastname,
      email: submitedForm.email,
      password: submitedForm.password,
      confirm_password: submitedForm.password,
      _id: "",
      shop_id: this.shop_id,
      address: submitedForm.queryAddress,
      city: submitedForm.city,
      role: "s",
      phone_no: submitedForm.queryphoneno,
      view: "n",
      status: "enable",
    };

    this.createUser = newUser;
  }
  close() {
    this.hideForm = true;
  }
  async updateProfile() {
    
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
  openCreateForm(){
    this.view= viewStatus.new;
    this.hideForm=false;
    this.staffForm.reset();
  }
  async CreateProfile() {
    if(!this.staffForm.valid){
      this.validateForm();
    }
    else{
      this.newUser(this.staffForm.value);
    }
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
  validateForm(){
    this.firstNameError=this.staffForm.controls.firstname.status ==="INVALID" ?  true:false;
    this.lastNameError=this.staffForm.controls.lastname.status ==="INVALID" ?  true:false;
    this.emailError=this.staffForm.controls.email.status ==="INVALID" ?  true:false;
    this.passwordError=this.staffForm.controls.password.status ==="INVALID" ?  true:false;
    this.phoneNumberError=this.staffForm.controls.queryphoneno.status ==="INVALID" ?  true:false;
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
