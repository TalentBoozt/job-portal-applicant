import { Component } from '@angular/core';
import {GitHubAuthService} from "../../../services/git-hub-auth.service";

@Component({
  selector: 'app-o-auth-callback-github',
  templateUrl: './o-auth-callback-github.component.html',
  styleUrls: ['./o-auth-callback-github.component.scss']
})
export class OAuthCallbackGithubComponent {

  constructor(private githubAuthService: GitHubAuthService) {}

  ngOnInit(): void {
    this.githubAuthService.handleRedirectCallback();
  }
}
