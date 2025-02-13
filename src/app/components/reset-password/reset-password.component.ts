import {AfterViewInit, Component} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {CredentialService} from "../../services/credential.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements AfterViewInit{

  email: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private credentialService: CredentialService, public themeService: ThemeService) {}

  onSubmit() {
    this.loading = false;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.email !== '') {
      this.loading = true;
      this.credentialService.resetPasswordRequest(this.email).subscribe(
        (response) => {
          this.loading = false;
          this.email = '';
          this.successMessage = 'Password reset link has been sent to your email';
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to send password reset link. Please try again.';
        }
      )
    }
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
