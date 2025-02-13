import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from "../../../services/google-auth.service";

@Component({
  selector: 'app-o-auth-callback',
  templateUrl: './o-auth-callback.component.html',
  styleUrls: ['./o-auth-callback.component.scss']
})
export class OAuthCallbackComponent implements OnInit{
  constructor(private googleAuthService: GoogleAuthService) {}

  ngOnInit(): void {
    this.googleAuthService.handleRedirectCallback();
  }
}
