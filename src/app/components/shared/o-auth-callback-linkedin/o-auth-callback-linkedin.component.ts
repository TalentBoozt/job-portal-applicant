import {Component, OnInit} from '@angular/core';
import {LinkedInAuthService} from "../../../services/linked-in-auth.service";

@Component({
  selector: 'app-o-auth-callback-linkedin',
  templateUrl: './o-auth-callback-linkedin.component.html',
  styleUrls: ['./o-auth-callback-linkedin.component.scss']
})
export class OAuthCallbackLinkedinComponent implements OnInit {

  constructor(private linkedInAuthService: LinkedInAuthService) {}

  ngOnInit() {
    const urlParams = new URLSearchParams((window as any).location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = (localStorage as any).getItem('linkedin_auth_state');

    this.linkedInAuthService.handleLinkedInCallback(urlParams, code, state, storedState);
  }
}
