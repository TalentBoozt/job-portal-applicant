import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-built-with',
  templateUrl: './built-with.component.html',
  styleUrls: ['./built-with.component.scss']
})
export class BuiltWithComponent {

  constructor(public themeService: ThemeService) {
  }
}
