import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechAndStartupComponent } from './tech-and-startup.component';

const routes: Routes = [{ path: '', component: TechAndStartupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechAndStartupRoutingModule { }
