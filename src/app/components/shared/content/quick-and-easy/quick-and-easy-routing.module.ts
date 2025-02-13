import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickAndEasyComponent } from './quick-and-easy.component';

const routes: Routes = [{ path: '', component: QuickAndEasyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickAndEasyRoutingModule { }
