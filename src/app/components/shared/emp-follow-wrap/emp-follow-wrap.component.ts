import {Component, EventEmitter, Input, Output} from '@angular/core';
import {singleEmployeeDataStore} from "../../../shared/data-store/single-employee-data-store";

@Component({
  selector: 'app-emp-follow-wrap',
  templateUrl: './emp-follow-wrap.component.html',
  styleUrls: ['./emp-follow-wrap.component.scss']
})
export class EmpFollowWrapComponent {
  @Input() employee: any;
  @Input() tab: string = 'followers';
  @Output() close = new EventEmitter<void>();

  activeFollowerTab: boolean = true;
  activeFollowingTab: boolean = false;

  ngOnInit() {
    this.isActive(this.tab);
  }

  closeWrapper() {
    this.close.emit();
  }

  isActive(name: string) {
    switch (name) {
      case 'followers':
        this.tab = 'followers';
        this.activeFollowerTab = true;
        this.activeFollowingTab = false;
        break;
      case 'following':
        this.tab = 'following';
        this.activeFollowingTab = true;
        this.activeFollowerTab = false;
        break;
      default:
        this.activeFollowerTab = true;
        this.activeFollowingTab = false;
        break;
    }
  }
}
