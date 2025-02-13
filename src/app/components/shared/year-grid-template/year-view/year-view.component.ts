import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../../services/common/login.service";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.scss'],
})
export class YearViewComponent implements OnInit{
  currentYear: number = new Date().getFullYear();
  loginDates: string[] = []; // Replace this with actual API data
  queryId: any;

  constructor(private loginService: LoginService, private cookieService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchLoginDatesForYear(this.currentYear);
  }

  handleYearChange(year: number): void {
    this.currentYear = year;
    this.fetchLoginDatesForYear(year);
  }

  fetchLoginDatesForYear(year: number): void {
    let userId = this.cookieService.userID();
    this.route.queryParamMap.subscribe(params => {
      this.queryId = params.get('id');
    })
    if (this.queryId) {
      userId = this.queryId
    }
    this.loginService.getLoginDates(userId, year).subscribe((dates) => {
      this.loginDates = dates;
    });
  }

  getMockedDataForYear(year: number): string[] {
    // Example mock data; replace with actual backend integration
    if (year === 2023) {
      return ['2023-01-01', '2023-02-14', '2023-12-25'];
    } else if (year === 2024) {
      return ['2024-01-01', '2024-03-17', '2024-10-12', '2024-12-09'];
    }
    return [];
  }
}
