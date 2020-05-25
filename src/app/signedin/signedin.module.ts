import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignedinPageRoutingModule } from './signedin-routing.module';
import { SignedinPage } from './signedin.page';
import {Geolocation} from '@ionic-native/geolocation/ngx';



@NgModule({

  providers : [Geolocation],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignedinPageRoutingModule,

    
  ],
  declarations: [SignedinPage]
})
export class SignedinPageModule {}
