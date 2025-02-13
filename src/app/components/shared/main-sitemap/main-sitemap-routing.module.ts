import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSitemapComponent } from './main-sitemap.component';

const routes: Routes = [{ path: '', component: MainSitemapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSitemapRoutingModule { }
