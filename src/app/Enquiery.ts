import { customer } from "./customer";
export interface Enquiery {
  _id?: string;
  customer_id?: customer;
  shop_id: string;
  view: string;
  status: string;
  products?: Query[];
  count: string;
  salesman_id: String;
  date_of_entry: number;
  logs: Array<string>;
}

interface Query {
  id: number;
  brand: string;
  product_type: string;
  model_no: string;
  given_price: string;
  days: number;
  payment_type: string;
  end_date: number;
}
