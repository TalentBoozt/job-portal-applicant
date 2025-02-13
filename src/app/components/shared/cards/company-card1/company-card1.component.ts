import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-company-card1',
  templateUrl: './company-card1.component.html',
  styleUrls: ['./company-card1.component.scss']
})
export class CompanyCard1Component {
  @Input() c: any = {};
  @Input() jobCount: any;
}
