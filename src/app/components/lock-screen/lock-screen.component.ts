import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CredentialService} from "../../services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertsService} from "../../services/alerts.service";
import { HttpErrorResponse } from "@angular/common/http";
import {EmployeeService} from "../../services/employee.service";
import {EncryptionService} from "../../services/encryption.service";

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements AfterViewInit, OnInit{

  employeeId:any;
  employee: any;

  unlockForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  })
  constructor(private cookieService: AuthService,
              private credentialService: CredentialService,
              private encryptionService: EncryptionService,
              private employeeService: EmployeeService,
              private router: Router,
              private alertService: AlertsService ) {}

  ngOnInit() {
    this.cookieService.lock();
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId)
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any) {
    this.employeeService.getEmployee(id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  unlockUser() {
    this.credentialService.fetchCredentialByEmployeeId(this.employeeId).subscribe(async (response: any) => {
      if (response) {
        const encryptedPassword = await this.encryptionService.decryptPassword(response.password?.toString());
        if (this.unlockForm.valid) {
          if (this.unlockForm.value.password === encryptedPassword) {
            this.cookieService.unlock();
            this.alertService.successMessage('Profile Unlocked!', 'Success');
            this.router.navigate(['/']);
          } else {
            this.alertService.errorMessage('Wrong Password', 'Error');
          }
        } else {
          this.alertService.errorMessage('Please Enter Your Password', 'Error');
        }
      }
    });
  }
}
