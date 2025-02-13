import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hire-card1',
  templateUrl: './hire-card1.component.html',
  styleUrls: ['./hire-card1.component.scss']
})
export class HireCard1Component {

  constructor(private router: Router ) { }

  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }
}
