import {NgModule} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {YearGridComponent} from "../../components/shared/year-grid-template/year-grid/year-grid.component";
import {
  YearNavigationComponent
} from "../../components/shared/year-grid-template/year-navigation/year-navigation.component";
import {YearViewComponent} from "../../components/shared/year-grid-template/year-view/year-view.component";

@NgModule({
  declarations: [
    YearGridComponent,
    YearNavigationComponent,
    YearViewComponent
  ],
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    NgClass
  ],
  exports: [
    YearGridComponent,
    YearNavigationComponent,
    YearViewComponent
  ]
})
export class YearGridComponentModule {}
