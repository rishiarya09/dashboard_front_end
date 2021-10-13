import { Component, OnInit, Input } from "@angular/core";
import { Enquiery } from "../../Enquiery";
import { enquery_success } from "src/app/success.model";
import { EnqueryServiceService } from "../../enquery-service/enquery-service.service";
// import { parse } from 'path';
import { DatePipe } from "@angular/common";
import { pipe } from "rxjs";
import { CommonService } from "../../common/common.service";
import { AlertService } from "../../alert-service/alert.service";

@Component({
  selector: "app-enquiry-details",
  templateUrl: "./enquiry-details.component.html",
  styleUrls: ["./enquiry-details.component.css"],
  providers: [EnqueryServiceService],
})
export class EnquiryDetailsComponent implements OnInit {
  count;
  @Input() query: Enquiery;

  @Input() createHandler: Function;
  @Input() updateHandler: Function;
  querieslist: Enquiery[];
  s_id: number;
  jwt_token: string;
  shop_id: string; // shop id from salesman after login
  salesmen_id; // salesman id from salesman after login
  errorMessage;
  role;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    private apicall: EnqueryServiceService,
    private datepipe: DatePipe,
    private cservice: CommonService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.activity();
  }
  async activity() {
    this.role = this.cservice.getUserDetails().role;
    this.salesmen_id = this.cservice.getUserDetails().salesmen_id; //salesmen id
    this.shop_id = this.cservice.getUserDetails().shop_id; // shop id
    const today = new Date();
    const date = this.datepipe.transform(today, "dd-MM-yyyy");
    // this.querieslist = await this.apicall.getEnquiries(this.s_id, date);
    // this.apicall.getTodaysEnquiries(this.salesmen_id, date).subscribe(
    //   (data) => {
    //     this.newquerylist = data;
    //     console.log(this.newquerylist);
    //   },
    //   (error) => {
    //     this.errorMessage = <any>error;
    //   }
    // );
    this.apicall.getEnquiries(this.salesmen_id, "15-08-2021").subscribe(
      (data) => {
        this.querieslist = data;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }
  setProduct(c) {
    let cur_prod_len = this.query.products.length;
    c = Number(this.query.count);
    console.log(cur_prod_len, c);
    if (c > cur_prod_len) {
      let final_count = c - cur_prod_len;
      const d = Date.parse("25-05-2018");
      for (let i = 0; i < final_count; i++) {
        const _id = Math.random();
        this.query.products.push({
          id: _id,
          brand: "",
          product_type: "",
          model_no: "",
          given_price: "",
          payment_type: "",
          end_date: d,
          days: 0,
        });
      }
    }
    console.log(this.query.products);
  }

  async createQuery(query: Enquiery) {
    query.products.forEach(
      function (e) {
        e.end_date = this.setDate(e.days);
      }.bind(this)
    );

    await this.apicall
      .createQuery(query)
      .then((newQuery: any) => {
        this.createHandler(newQuery.res);
        this.alertService.success(newQuery.message, this.options);
      })
      .catch((error) => {
        this.alertService.error(error, this.options);
      });
    this.activity();
  }

  updateQuery(query: Enquiery): void {
    this.querieslist.forEach(
      function (e) {
        if (e._id === query._id) {
          e.products.forEach(
            function (w) {
              query.products.forEach(
                function (q) {
                  if (w.id === q.id && w.days !== q.days) {
                    q.date = this.setDate(q.days);
                  }
                }.bind(this)
              );
            }.bind(this)
          );
        }
      }.bind(this)
    );
    if (this.role == "m") {
      const today = new Date();
      let msg = "Manager has updated the document on " + today;
      query.logs.push(msg);
    }
    this.apicall
      .updateQuery(this.salesmen_id, query)
      .then((updatedQuery: enquery_success) => {
        this.updateHandler(updatedQuery.res);
        this.alertService.success(updatedQuery.message, this.options);
      })
      .catch((error) => {
        this.alertService.error(error, this.options);
      });
  }
  setDate(days) {
    const theDate = new Date();
    const date = new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    return this.datepipe.transform(date, "dd-MM-yyyy");
  }
}
