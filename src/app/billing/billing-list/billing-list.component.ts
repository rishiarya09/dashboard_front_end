import { Component, OnInit } from "@angular/core";
import { ApiCallsService } from "../../api-calls.service";
import { Billing } from "../../billing";
import { DatePipe } from "@angular/common";
import { CommonService } from "../../common/common.service";
@Component({
  selector: "app-billing-list",
  templateUrl: "./billing-list.component.html",
  styleUrls: ["./billing-list.component.css"],
  providers: [ApiCallsService],
})
export class BillingListComponent implements OnInit {
  billingQueries: Billing[];
  selectedBill: Billing;
  filteredQuieries;
  s_id: String;
  date;
  view;
  constructor(
    private apiCall: ApiCallsService,
    private datepipe: DatePipe,
    private cservice: CommonService
  ) {}

  ngOnInit() {
    this.activate();
  }
  async activate() {
    const today = new Date();
    this.s_id = this.cservice.getsid();
    const date = this.datepipe.transform(today, "dd-MM-yyyy");
    // this.billingQueries = await this.apiCall.getBillings(this.s_id, date);
    window.setInterval(() => {
      this.apiCall
        .getBillings(this.s_id, date)
        .subscribe((data) => (this.billingQueries = data)),
        10000;
    });
    // this.apiCall.getBillings(this.s_id, date).subscribe(data => this.billingQueries = data);
    this.date = date;
  }
  private getIndexOfContact(billId: String) {
    return this.billingQueries.findIndex((bill) => {
      return bill._id === billId;
    });
  }

  selectBill(bill: Billing) {
    this.selectedBill = bill;
  }

  createNewBilling() {
    const bill: Billing = {
      name: "",
      phone_no: 0,
      address: "",
      city: "",
      date: this.date,
      s_id: this.s_id,
      view: "n",
      status: "p",
      products: [
        {
          product_type: "",
          model_no: "",
          given_price: "",
          payment_type: "",
          comments: "",
          stock_place: "",
        },
      ],
      count: "",
    };
    bill.view = "n";
    // By default, a newly-created contact will have the selected state.
    this.selectBill(bill);
  }
  viewBill(bill: Billing) {
    bill.view = "v";
    this.selectBill(bill);
  }

  addBill = (bill: Billing) => {
    this.billingQueries.push(bill);
    this.selectBill(bill);
    return this.billingQueries;
  };

  updateBill = (bill: Billing) => {
    const idx = this.getIndexOfContact(bill._id);
    if (idx !== -1) {
      this.billingQueries[idx] = bill;
      this.selectBill(bill);
    }
    return this.billingQueries;
  };
}
