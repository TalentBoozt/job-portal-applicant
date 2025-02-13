import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuiltWithComponent } from './built-with.component';

const routes: Routes = [{ path: '', component: BuiltWithComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuiltWithRoutingModule { }
