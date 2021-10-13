import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { BillingListComponent } from "./billing/billing-list/billing-list.component";
import { BillingDetailsComponent } from "./billing/billing-details/billing-details.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EnquiryListComponent } from "./enquiry/enquiry-list/enquiry-list.component";
import { EnquiryDetailsComponent } from "./enquiry/enquiry-details/enquiry-details.component";
import { DatePipe } from "@angular/common";
import { LoginComponent } from "./Login/login/login.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { JsonconvPipe } from "./jsonconv.pipe";
import { CommonModule } from "./common/common.module";
import { AuthInterceptor } from "./Interceptors/AuthInterceptor";
import { AlertComponent } from "./_alert/alert/alert.component";
import { AlertModuleModule } from "./_alert/alert-module/alert-module.module";
import { ProfileCreateComponent } from "./manager/profile-create/profile-create.component";
import { ShopCreateComponent } from "./admin/shop-create/shop-create.component";
import { ShopStaffCreateComponent } from "./admin/shop-staff-create/shop-staff-create.component";
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "enquiry-list", component: EnquiryListComponent },
  { path: "billing-list", component: BillingListComponent },
  { path: "profile-create", component: ProfileCreateComponent },
  { path: "shopCreate", component: ShopCreateComponent },
  { path: "staffCreate", component: ShopStaffCreateComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    BillingListComponent,
    BillingDetailsComponent,
    EnquiryListComponent,
    EnquiryDetailsComponent,
    LoginComponent,
    JsonconvPipe,
    ProfileCreateComponent,
    ShopCreateComponent,
    ShopStaffCreateComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule.forRoot(),
    AlertModuleModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
