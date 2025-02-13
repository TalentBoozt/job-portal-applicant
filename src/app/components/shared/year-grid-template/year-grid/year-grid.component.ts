import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-year-grid',
  templateUrl: './year-grid.component.html',
  styleUrls: ['./year-grid.component.scss'],
})
export class YearGridComponent implements OnInit, OnChanges {
  @Input() loginDates: string[] = []; // Dates when the user logged in
  @Input() year: number = new Date().getFullYear();

  yearDays: { date: any }[] = []; // Array representing all days (and padding days)
  months = ['Jan', ' ', 'Mar', ' ', 'May', ' ', 'Jul', ' ', 'Sep', ' ', 'Nov', ' '];
  days = ["", "M", "", "W", "", "F", ""];

  ngOnInit(): void {
    this.generateYearDays(new Date().getFullYear());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year']) {
      this.generateYearDays(this.year); // Regenerate the grid when the year changes
    }
  }

  generateYearDays(year: number): void {
    this.yearDays = [];
    const startDate = new Date(year, 0, 1); // Jan 1 of the selected year
    const totalDays = this.isLeapYear(year) ? 366 : 365;
    const startDayOfWeek = startDate.getDay();

    const grid: { date: string | null }[][] = Array.from({ length: 7 }, () =>
      Array(53).fill({ date: null })
    );

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(year, 0, 1 + i + 1);
      const week = Math.floor((startDayOfWeek + i) / 7);
      const dayOfWeek = (startDayOfWeek + i) % 7;

      grid[dayOfWeek][week] = { date: currentDate.toISOString().split('T')[0] };
    }

    this.yearDays = grid.flat();
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
