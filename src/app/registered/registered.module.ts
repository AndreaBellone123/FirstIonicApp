import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisteredPageRoutingModule } from './registered-routing.module';

import { RegisteredPage } from './registered.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisteredPageRoutingModule
  ],
  declarations: [RegisteredPage]
})
export class RegisteredPageModule {}
