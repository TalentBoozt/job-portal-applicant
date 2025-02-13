import {InvoiceModel} from "../../data-models/payment/Invoice.model";

export var invoiceDataStore: InvoiceModel[] = [
  {
    id: "601",
    companyId: "1",
    invoice_number: "INV-0001",
    amount: 29.99,
    date_issued: "2023-09-01",
    due_date: "2023-09-15",
    status: "Paid"
  }
]
