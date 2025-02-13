import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements AfterViewInit, OnInit{

  constructor(private meta: Meta, private title: Title, private windowService: WindowService) {
  }

  ngOnInit() {
    this.title.setTitle('Talentboozt -Privacy Policy');
    this.meta.addTags([
      { name: 'description', content: 'This Privacy Policy describes Our policies and procedures on the collection, use ' +
          'and disclosure of Your information when You use the Service and tells You about Your privacy rights and how ' +
          'the law protects You.' },
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
