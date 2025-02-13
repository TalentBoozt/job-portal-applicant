import {RouterModule, Routes} from "@angular/router";
import {LockScreenComponent} from "./lock-screen.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [{path: '', component: LockScreenComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockScreenRoutingModule {
}
