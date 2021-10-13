import { Component, OnInit, Query } from "@angular/core";
import { EnqueryServiceService } from "../../enquery-service/enquery-service.service";
import { Enquiery } from "../../Enquiery";
import { DatePipe } from "@angular/common";
import { CommonService } from "../../common/common.service";
import { AuthServiceService } from "../../AuthService/auth-service.service";
import { Router } from "@angular/router";
import { enquery_success } from "src/app/success.model";
import { AlertService } from "../../alert-service/alert.service";

@Component({
  selector: "app-enquiry-list",
  templateUrl: "./enquiry-list.component.html",
  styleUrls: ["./enquiry-list.component.css"],
  providers: [EnqueryServiceService],
})
export class EnquiryListComponent implements OnInit {
  querieslist: Enquiery[];
  newquerylist: Enquiery[] = [];
  selectedQuery: Enquiery;
  filteredquierieslist;
  jwt_token: string;
  shop_id: string; // shop id from salesman after login
  salesmen_id; // salesman id from salesman after login
  todayeDate;
  role: string;
  errorMessage;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    private apiCall: EnqueryServiceService,
    private datepipe: DatePipe,
    private cservice: CommonService,
    private Auth: AuthServiceService,
    private router: Router,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.activate();
  }
  async activate() {
    this.salesmen_id = this.cservice.getUserDetails().salesmen_id; //salesmen id
    this.shop_id = this.cservice.getUserDetails().shop_id; // shop id
    this.role = this.cservice.getUserDetails().role;
    const today = new Date();
    const date = this.datepipe.transform(today, "dd-MM-yyyy");

    // THis Api is to call the enqueries that are added today by salesmen. IN Backend Date_of_entry field .
    this.apiCall.getTodaysEnquiries(this.salesmen_id, date).subscribe(
      (data) => {
        this.newquerylist = data;
        console.log(this.newquerylist);
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
    this.apiCall.getEnquiries(this.salesmen_id, "15-08-2021").subscribe(
      (data) => {
        this.querieslist = data;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );

    this.todayeDate = date;
  }
  updatestatus(query: Enquiery) {
    if (this.role == "m") {
      let msg = "Manager has updated status on " + this.todayeDate;
      query.logs.push(msg);
    }
    this.apiCall
      .updateQuery(this.salesmen_id, query)
      .then((updatedQuery: enquery_success) => {
        this.alertService.success(updatedQuery.message, this.options);
      })
      .catch((error) => {
        this.alertService.error(error, this.options);
      });
  }

  // find this out
  getIndexOfContact(QueryId: String) {
    return this.querieslist.findIndex((query) => {
      return query._id === QueryId;
    });
  }

  selectQuery(query: Enquiery) {
    this.selectedQuery = query;
  }

  createNewQuery() {
    const i = Math.random();
    const query: Enquiery = {
      customer_id: { name: "", phone_no: 0, address: "", city: "" },
      shop_id: this.shop_id,
      view: "n",
      status: "p",
      date_of_entry: this.todayeDate,
      logs: [],
      products: [
        {
          id: i,
          brand: "",
          product_type: "",
          model_no: "",
          given_price: "",
          days: 0,
          payment_type: "",
          end_date: 0,
        },
      ],
      count: "1",
      salesman_id: this.salesmen_id,
    };
    query.view = "n";
    // By default, a newly-created contact will have the selected state.
    this.selectQuery(query);
  }

  // to make the state to view
  viewQuery(query: Enquiery) {
    query.view = "v";
    this.selectQuery(query);
  }

  // This function is used to maintain the create handler. When handler is returns query this ffunction will add and return newquerylist by adding the current newly added query. "newquerylist" is newly added list of query for the day.
  addQuery = (query: Enquiery) => {
    this.newquerylist.push(query);
    this.selectQuery(query);
    this.activate();
    return this.newquerylist;
  };

  // need to find
  updateQuery = (query: Enquiery) => {
    console.log(query);
    const idx = this.getIndexOfContact(query._id);
    if (idx !== -1) {
      this.querieslist[idx] = query;
    }
    this.activate();
    return this.querieslist;
  };
  logout() {
    this.Auth.logout();
    this.router.navigate(["/login"]);
  }
}
