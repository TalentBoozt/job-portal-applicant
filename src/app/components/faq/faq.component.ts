import {
  AfterViewInit,
  Component,
  ElementRef, OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
// import {FAQUtilities} from "../../shared/utilities/faq.utilities";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements AfterViewInit, OnInit{
  @ViewChild('buyingSec') buyingSec!: ElementRef;
  @ViewChild('generalSec') generalSec!: ElementRef;
  @ViewChild('paymentsSec') paymentsSec!: ElementRef;
  @ViewChild('supportSec') supportSec!: ElementRef;
  @ViewChild('accountSec') accountSec!: ElementRef;
  @ViewChild('companySec') companySec!: ElementRef;
  @ViewChild('legalSec') legalSec!: ElementRef;
  @ViewChild('otherSec') otherSec!: ElementRef;

  @ViewChildren('buying, general, payments, support, account, company, legal, other') sectionButtons!: QueryList<ElementRef>;

  // utilities = FAQUtilities;

  constructor(private meta: Meta, private title: Title, private windowService: WindowService) {
  }

  ngOnInit() {
    this.title.setTitle('Talentboozt -FAQ');
    this.meta.addTags([
      { name: 'description', content: 'Talent Boozt Frequently Asked Questions. General Questions, Buying Questions, Payments FAQ' },
      { name: 'keywords', content: 'Buying Questions, General Questions, Payments FAQ, Account Issues, Support Queries, ' +
          'Company Information, Legal Inquiries, Other Questions, FAQ Categories, Customer Support, Payment Methods, ' +
          'Account Management, Buying Process, Company Policies, Legal Terms, Common Questions, Customer Assistance' }
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

  private resetActiveClass() {
    this.sectionButtons.forEach(button => button.nativeElement.classList.remove('active'));
  }

  navigateSection(section: string) {
    // Scroll to the selected section
    const sectionMap: { [key: string]: ElementRef } = {
      buying: this.buyingSec,
      general: this.generalSec,
      payments: this.paymentsSec,
      support: this.supportSec,
      account: this.accountSec,
      company: this.companySec,
      legal: this.legalSec,
      other: this.otherSec
    };

    sectionMap[section]?.nativeElement.scrollIntoView({ behavior: 'smooth' });

    // Update active class
    this.resetActiveClass();
    const activeButton = this.sectionButtons.find(button => button.nativeElement.id === section);
    activeButton?.nativeElement.classList.add('active');
  }
}
