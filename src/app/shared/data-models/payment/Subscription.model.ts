export interface SubscriptionModel {
  id?: any;
  companyId?: any;
  plan_name?: any; //Free, Premium
  start_date?: any;
  end_date?: any;
  cost?: any;
  billing_cycle?: any; //Monthly, Yearly
  is_active?: any;
}
