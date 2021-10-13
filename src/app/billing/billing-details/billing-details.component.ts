import { Component, OnInit, Input } from '@angular/core';
import { Billing } from '../../billing';
import { ApiCallsService } from '../../api-calls.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {
  count;
  @Input() bill: Billing;

  @Input() createHandler: Function;
  @Input() updateHandler: Function;

  days; // to get the count of days;
  constructor(private apicall: ApiCallsService, private datepipe: DatePipe) { }

  ngOnInit() {
  }
  setProduct(c) {
    this.bill.products = [];
    c = Number(this.count);
    for (let i = 0; i < c; i++) {
      this.bill.products.push({
        product_type: '',
        model_no: '',
        given_price: '',
        payment_type: '',
        comments: '',
        stock_place: ''
      });
    }

  }
  async createBill(bill: Billing) {
    await this.apicall.createBill(bill).then((newBill: Billing[]) => {
      this.createHandler(newBill);
    });
  }

  updateBill(bill: Billing): void {
    this.apicall.updateBill(bill).then((updatedBill: Billing[]) => {
      this.updateHandler(updatedBill);
    });
  }

}
