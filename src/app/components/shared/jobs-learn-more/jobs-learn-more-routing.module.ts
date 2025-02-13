import {RouterModule, Routes} from "@angular/router";
import {JobsLearnMoreComponent} from "./jobs-learn-more.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: JobsLearnMoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsLearnMoreRoutingModule {}
