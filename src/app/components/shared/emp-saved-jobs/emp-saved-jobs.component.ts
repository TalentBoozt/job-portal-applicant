import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MyJobListRandomHintDataStore} from "../../../shared/data-store/my-job-list-random-hint-data-store";

@Component({
  selector: 'app-emp-saved-jobs',
  templateUrl: './emp-saved-jobs.component.html',
  styleUrls: ['./emp-saved-jobs.component.scss']
})
export class EmpSavedJobsComponent implements OnInit, AfterViewInit {

  jobHints = MyJobListRandomHintDataStore.data
  selectedJobHint: any
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.randomHint()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveClass();
      }
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  navigateBetweenTabs(path: string) {
    this.router.navigate([`/my-jobs/${path}`]);
  }

  updateActiveClass() {
    const currentRoute = this.router.url;

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-link[href="${currentRoute}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  isActive(path: string) {
    return this.router.url === `/my-jobs/${path}`;
  }

  randomHint() {
    if (!sessionStorage.getItem('jobHint')) {
      this.selectedJobHint = this.jobHints[Math.floor(Math.random() * this.jobHints.length)];
      sessionStorage.setItem('jobHint', JSON.stringify(this.selectedJobHint));
    } else {
      this.selectedJobHint = JSON.parse(sessionStorage.getItem('jobHint')!);
    }
  }
}
