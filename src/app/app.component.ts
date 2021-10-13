import { Component } from "@angular/core";
import { AuthServiceService } from "./AuthService/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private Auth: AuthServiceService, private router: Router) {}
  title = "salesman";
}
