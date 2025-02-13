import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Utilities} from "../../shared/utilities/utilities";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements AfterViewInit, OnInit{

  utilities = Utilities;

  constructor(private meta: Meta, private title: Title, private windowService: WindowService) {
  }

  ngOnInit() {
    this.title.setTitle('Talentboozt -Terms & Conditions');
    this.meta.addTags([
      { name: 'description', content: 'TalentBoozt ("we," "our," or "us") provides a platform to connect job seekers ' +
          '("Applicants") with employers("Employers"). By using our Site, you agree to these Terms and our Privacy Policy.' },
      { name: 'keywords', content: 'Terms and Conditions, User Agreements, Usage Policies, Service Restrictions, ' +
          'Content Guidelines, Acceptable Use, Privacy Compliance, User Rights and Responsibilities, Legal Agreement, ' +
          'Digital Marketing Solutions, Usage Limitations, Prohibited Actions, Service Disclaimers, Question & Answer, ' +
          'Policy Overview, General Terms, Legal Compliance, Service Restrictions, Disclaimer Notice' }
    ]);
  }

  ngAfterViewInit() {
    if (this.windowService.nativeDocument){
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }
}
