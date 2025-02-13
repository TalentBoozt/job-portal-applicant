import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ValueIncrementService} from "../../services/value-increment.service";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common/common.service";
import {AlertsService} from "../../services/alerts.service";
import {Utilities} from "../../shared/utilities/utilities";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('achievementsSection') achievementsSection!: ElementRef;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | any;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | any;

  jobsAch: number = 0;
  branchesAch: number = 0;
  countriesAch: number = 2;
  jobsAchValue: number = 0;
  branchesAchValue: number = 0;
  countriesAchValue: number = 0;
  observer!: IntersectionObserver;

  zoom = 12;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8
  };
  markers:any = [
    {
      position: {
        lat: 60.170457948013656,
        lng: 24.668426188871543
      },
      label: {
        color: '#fff',
        text: 'Meet Us Here',
        weight: 'bold',
        fontSize: '20px'
      },
      title: 'Talent Boozt Pvt LTD',
      info: 'Visit our location',
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    }
  ];
  infoContent = '';

  card1: any = '24 / 7 assistance to help you locate the greatest employment prospects.';
  card2: any = 'Look through innovative IT jobs and rapidly expanding startups.';
  card3: any = 'Seamless application process—find and apply for jobs with just a few clicks.';
  card4: any = 'Streamline your job search and focus on opportunities that match your skills.';

  contactUsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })
  loading: boolean = false;

  utilities = Utilities;

  constructor(private valueIncrementService: ValueIncrementService,
              private commonService: CommonService,
              private windowService: WindowService,
              private meta: Meta, private title: Title,
              private alertService: AlertsService) { }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    if (this.windowService.nativeDocument){
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Talentboozt -About Us');
    this.meta.addTags([
      { name: 'description', content: 'We’re a dedicated team of HR Professional and Tech enthusiasts passionate about ' +
          'connecting people with opportunity and fulfilling human potential.' },
      { name: 'keywords', content: 'Talent Connection, HR Professionals, Tech Enthusiasts, Fulfilling Human Potential, ' +
          'Inclusive Platform, Diversity and Equality, Job Matching, Innovative Hiring Solutions, Seamless Job Search, ' +
          'Transparency in Recruitment, Streamlined Hiring Process, Smart Tools for Employers, Candidate-Centric Design, ' +
          'Continuous Learning, 24/7 Support, Personalized Opportunities, Equal Opportunity Hiring, Global Talent Pool, ' +
          'User-Focused Solutions' }
    ]);
    if (this.windowService.nativeLocalStorage){
      this.jobsAch = (localStorage as any).getItem('jobsAch') ? Number(localStorage.getItem('jobsAch')) : 0;
      this.branchesAch = (localStorage as any).getItem('branchesAch') ? Number(localStorage.getItem('branchesAch')) : 0;
    }
    this.initMap();
  }

  initMap(){
    this.center = {
      lat: 60.170457948013656,
      lng: 24.668426188871543
    };
  }

  setupIntersectionObserver() {
    if (this.windowService.interSectionObserver) {
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is in view, start the animation
            this.incrementJobsValue(this.jobsAch, 100);
            this.incrementBranchesValue(this.branchesAch, 100);
            this.incrementCountriesValue(this.countriesAch, 100);
            // Once the animation has started, we can stop observing this element
            observer.unobserve(entry.target);
          }
        });
      }, {threshold: 0.2});

      // Start observing the achievements section
      if (this.achievementsSection) {
        this.observer.observe(this.achievementsSection.nativeElement);
      }
    }
  }

  incrementJobsValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.jobsAchValue = value;
    }, interval);
  }

  incrementBranchesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.branchesAchValue = value;
    }, interval);
  }

  incrementCountriesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.countriesAchValue = value;
    }, interval);
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  openInfo(marker: HTMLElement, content: any) {
    const mark = marker as unknown as MapMarker;
    this.infoContent = content;
    this.info.open(mark);
  }

  contactUs() {
    if (this.contactUsForm.valid) {
      this.loading = true;
      this.commonService.contactUs({
        name: this.contactUsForm.get('name')?.value,
        email: this.contactUsForm.get('email')?.value,
        subject: this.contactUsForm.get('subject')?.value,
        message: this.contactUsForm.get('message')?.value
      }).subscribe((res: any) => {
        this.loading = false;
        this.contactUsForm.reset();
        this.alertService.successMessage('Thank you for contacting us. We will get back to you shortly.', 'Contact Us');
      }, (err: any) => {
        this.loading = false;
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Contact Us');
      })
    } else {
      this.alertService.errorMessage('Please fill in all the required fields.', 'Contact Us');
    }
  }
}
