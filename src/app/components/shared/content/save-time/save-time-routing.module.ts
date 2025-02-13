import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveTimeComponent } from './save-time.component';

const routes: Routes = [{ path: '', component: SaveTimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveTimeRoutingModule { }
