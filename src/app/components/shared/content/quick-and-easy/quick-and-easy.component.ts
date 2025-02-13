import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-and-easy',
  templateUrl: './quick-and-easy.component.html',
  styleUrls: ['./quick-and-easy.component.scss']
})
export class QuickAndEasyComponent {
  card1: any = 'Easily find relevant job listings and filter by industry, location, or experience level.';
  card2: any = 'Apply to multiple jobs instantly with our intuitive one-click application feature.';
  card3: any = 'Get real-time updates on job matches and application status.';
}
