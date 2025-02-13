import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PreOrderService} from "../../../services/pre-order.service";

@Component({
  selector: 'app-pre-order',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.scss']
})
export class PreOrderComponent implements OnInit{
  subscriptionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    product: new FormControl('Premium Version', [Validators.required])
  })

  loading = false;

  constructor(private alertService: AlertsService,
              private preOrderService: PreOrderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  order(){
    if (this.subscriptionForm.valid) {
      this.loading = true;
      this.preOrderService.addPreOrder({
        name: this.subscriptionForm.value.name,
        email: this.subscriptionForm.value.email,
        product: this.subscriptionForm.value.product,
        date: new Date()
      }).subscribe((data) => {
        this.loading = false;
        this.alertService.successMessage('Pre-order submitted successfully', 'success');
        this.subscriptionForm.reset();
        this.router.navigate(['/thank-you'], {relativeTo: this.route});
      }, (error) => {
        this.loading = false;
        this.alertService.errorMessage('Something went wrong', 'error');
      });
    } else {
      this.alertService.errorMessage('Please fill all the fields', 'error');
    }
  }
}
