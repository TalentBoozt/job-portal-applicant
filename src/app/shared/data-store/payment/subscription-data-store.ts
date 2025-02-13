import {SubscriptionModel} from "../../data-models/payment/Subscription.model";

export var subscriptionDataStore: SubscriptionModel[] = [
  {
    id: "101",
    companyId: "1",
    plan_name: "Premium",
    start_date: "2023-09-01",
    end_date: "2024-09-01",
    cost: 29.99,
    billing_cycle: "Monthly",
    is_active: true
  }
]
