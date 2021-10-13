export interface User {
  first_name: String;
  last_name: String;
  _id: string;
  email: String;
  shop_id: string;
  role: string;
  token: String;
  expiresIn: String;
  phone_no: string;
  address: string;
  city: string;
}

export interface userNew {
  first_name: String;
  last_name: String;
  password?: string;
  confirm_password?: string;
  _id: string;
  email: String;
  shop_id: string;
  role: string;
  address: string;
  city: string;
  phone_no: string;
  view: string;
  status: string;
}
