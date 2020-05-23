import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedinPage } from './signedin.page';

const routes: Routes = [
  {
    path: '',
    component: SignedinPage

  } ,


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignedinPageRoutingModule {}
