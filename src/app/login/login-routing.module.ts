import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  } ,


  {
    path: 'signedin',
    loadChildren: () => import('../signedin/signedin.module').then( m => m.SignedinPageModule)

  } ,

];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
