import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-year-navigation',
  templateUrl: './year-navigation.component.html',
  styleUrls: ['./year-navigation.component.scss'],
})
export class YearNavigationComponent {
  year: number = new Date().getFullYear(); // Current year
  thisYear: number = new Date().getFullYear();

  @Output() yearChanged = new EventEmitter<number>(); // Emit the selected year

  changeYear(offset: number): void {
    if (this.year + offset <= new Date().getFullYear()) {
      this.year += offset; // Update the year
      this.yearChanged.emit(this.year); // Notify parent component
    }

  }
}
