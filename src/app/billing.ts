export interface Billing {
  _id?: string;
  name: string;
  phone_no: number;
  address: string;
  city: string;
  date: string;
  s_id: String;
  view: string;
  status: string;
  products?: Product[];
  count: string;
}

interface Product {
  product_type: string;
  model_no: string;
  given_price: string;
  payment_type: string;
  comments: string;
  stock_place: string;
}
