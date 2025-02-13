import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-jobs-learn-more',
  templateUrl: './jobs-learn-more.component.html',
  styleUrls: ['./jobs-learn-more.component.scss']
})
export class JobsLearnMoreComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
