import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    IonicModule,
    ReservationsPageRoutingModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
