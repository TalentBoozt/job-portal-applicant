import {Component, OnInit} from '@angular/core';
import {CredentialService} from "../../../../services/credential.service";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-offer-card1',
  templateUrl: './offer-card1.component.html',
  styleUrls: ['./offer-card1.component.scss']
})
export class OfferCard1Component implements OnInit{

  isOfferActive = false;
  seatsLeft = 0;

  constructor(private credentialService: CredentialService,
              public themeService: ThemeService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.credentialService.fetchCredentials().subscribe((response: any) => {
      let users: any;
      users = response.filter((user: any) => user.userLevel === '3');
      this.seatsLeft = 30 - users.length;
      if (this.seatsLeft > 0 && this.seatsLeft <= 30) {
        this.isOfferActive = true;
      }
    });
  }
}
