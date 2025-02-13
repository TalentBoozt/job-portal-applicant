import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ThemeService} from "./services/theme.service";
import {Router} from "@angular/router";
import {LockScreenComponent} from "./components/lock-screen/lock-screen.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {commonSearchResults} from "./shared/data-store/common-search-results";
import {AuthService} from "./services/auth.service";
import {EmployeeService} from "./services/employee.service";
import {CredentialService} from "./services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "./services/alerts.service";
import {FileUploadService} from "./services/file-upload.service";
import {ReportIssueService} from "./services/report-issue.service";
import {CommonService} from "./services/common/common.service";
import {Utilities} from "./shared/utilities/utilities";
import {HomeComponent} from "./components/home/home.component";
import {LoginService} from "./services/common/login.service";
import {WindowService} from "./services/common/window.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navbarNav') navbarNav: ElementRef | any;
  title = 'Talent Boozt -Unlock Your Future with the Perfect Job';

  showNavbar = true;
  showFooter = true;

  openSearchResults = false;
  commonSearchResults: any[] = commonSearchResults;
  filteredSearchResults: any[] = [];
  targetInput: any;

  employee: any;
  employeeId: any;
  employeeLevel: any;
  employeeType: any;

  downloadURL?: any;

  isTranslator: boolean = false;
  isUiSettings: boolean = false;
  showContacts: boolean = false;
  isSubscribe: boolean = false;
  isCookiesAccepted: boolean = false;
  loading: boolean = false;

  utilities = Utilities;

  newsLetterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(public themeService: ThemeService,
              private router: Router,
              private renderer: Renderer2,
              private employeeService: EmployeeService,
              private credentialsService: CredentialService,
              private fileUploadService: FileUploadService,
              private reportIssueService: ReportIssueService,
              private commonService: CommonService,
              private alertService: AlertsService,
              private loginService: LoginService,
              private windowService: WindowService,
              private cookieService: AuthService) {
  }

  ngOnInit() {
    if (this.windowService.nativeDocument && this.windowService.nativeLocalStorage) {
      localStorage.setItem('demoMode', 'false');
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.style.display = 'none';
        }
      },1500);
      const appRoot = document.querySelector('app-root') as HTMLElement;
      if (appRoot) {
        appRoot.style.display = 'block';
      }
    }

    this.employeeId = this.cookieService.userID();
    this.employeeLevel = this.cookieService.level();
    this.themeService.applyTheme();

    this.isSubscribe = this.cookieService.isNewsletter();
    if (this.cookieService.isCookiesAccepted()) {
      this.isCookiesAccepted = true;
    }

    if (this.windowService.nativeSessionStorage && this.windowService.nativeDocument) {
      if (sessionStorage.getItem('newsLatter') != 'true' && !this.isSubscribe) {
        setTimeout(() => {
          const model_open = document.getElementById('news_model_open_main');
          model_open?.click();
          sessionStorage.setItem('newsLatter', 'true');
        }, 10000)
      }
    }
  }

  ngAfterViewInit() {
    if(this.windowService.nativeDocument){
      const icons = document.querySelectorAll('.material-icons');
      icons.forEach((icon) => {
        icon.setAttribute('translate', 'no');
      });
    }

    this.markAttendance()
  }

  ngOnDestroy() {
    this.removeUnwantedSession()
  }

  markAttendance(){
    if (this.employeeId){
      this.loginService.recordLogin(this.employeeId).subscribe(data => {
        this.alertService.successMessage('Good to see you back :)', 'Welcome')
      }, error => {
        // do nothing
      });
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  changeColorShading(color: string) {
    this.themeService.changeColorShading(color);
  }

  toggleCommonComponent(component: any) {
    if (component instanceof LockScreenComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof LoginComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof RegisterComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof ResetPasswordComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof HomeComponent) {
      this.showFooter = false;
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
      this.showFooter = true;
    }
  }

  removeUnwantedSession() {
    if (this.windowService.nativeSessionStorage) {
      sessionStorage.clear();
    }
  }

  clickTranslate() {
    this.isTranslator = !this.isTranslator;
  }

  openUiSettings() {
    this.isUiSettings = !this.isUiSettings;
  }

  toggleContacts() {
    this.showContacts = !this.showContacts;
  }

  subscribeNewsLatter() {
    if (this.newsLetterForm.valid) {
      this.loading = true;
      const email = this.newsLetterForm.get('email')?.value;
      if (email) {
        this.commonService.subscribeNewsLatter(email).subscribe((data) => {
          this.alertService.successMessage('Email sent successfully.', 'Success');
          this.cookieService.newsletter();
          this.loading = false;
          this.newsLetterForm.reset();
          if (this.windowService.nativeDocument) {
            const model_close = document.getElementById('news_model_close_main');
            model_close?.click();
          }
          return;
        }, (error) => {
          this.newsLetterForm.get('email')?.setValue('Error');
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
          this.loading = false;
        })
      }
    } else {
      this.alertService.errorMessage('Field is empty or invalid.', 'Error');
    }
  }

  acceptCookies() {
    this.cookieService.acceptAllCookies();
    this.isCookiesAccepted = true;
  }
}
