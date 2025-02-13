export interface PaymentMethodsModel {
  id?: any;
  companyId?: any;
  type?: any; //paypal, stripe, credit card
  last_four?: any; //last four digits of credit card for security purposes
  expiry_date?: any;
  is_default?: any;
}
