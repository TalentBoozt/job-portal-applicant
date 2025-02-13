import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSitemapRoutingModule } from './main-sitemap-routing.module';
import { MainSitemapComponent } from './main-sitemap.component';


@NgModule({
  declarations: [
    MainSitemapComponent
  ],
  imports: [
    CommonModule,
    MainSitemapRoutingModule
  ]
})
export class MainSitemapModule { }
