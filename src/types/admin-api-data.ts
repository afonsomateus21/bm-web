enum UserType {
  Admin = "ADMIN",
  Customer = "CUSTOMER"
}

export interface ApiAdmin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  type: UserType;
  google_sub: string;
}