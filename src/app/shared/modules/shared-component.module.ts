import {NgModule} from "@angular/core";
import {UnderDevelopmentComponent} from "../../components/shared/under-development/under-development.component";
import {FailedToLoadDataComponent} from "../../components/shared/failed-to-load-data/failed-to-load-data.component";
import {RouterLink} from "@angular/router";
import {PageLoadingComponent} from "../../components/shared/page-loading/page-loading.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ResultNotFoundComponent} from "../../components/shared/result-not-found/result-not-found.component";
import {NetworkErrorComponent} from "../../components/shared/network-error/network-error.component";
import {ForbiddenComponent} from "../../components/shared/forbidden/forbidden.component";
import {
  SystemNotificationViewComponent
} from "../../components/shared/system-notification-view/system-notification-view.component";
import {SharedPipesModule} from "./shared-pipes.module";

@NgModule({
  declarations: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent,
    PageLoadingComponent,
    ResultNotFoundComponent,
    NetworkErrorComponent,
    ForbiddenComponent,
    SystemNotificationViewComponent
  ],
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    NgClass
  ],
  exports: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent,
    PageLoadingComponent,
    ResultNotFoundComponent,
    NetworkErrorComponent,
    ForbiddenComponent,
    SystemNotificationViewComponent
  ]
})
export class SharedComponentModule { }
