import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { LoggedComponent } from '../logged/logged.component';



@NgModule({

    providers : [Geolocation],
  
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      AppRoutingModule,
      
    ],
    
  })


export class Logged { 
 
    constructor(email: string,   password : string ) {
        this.email=email;
        this.password = password;
       
    }
 
    email : string ;
    password : string ;
    

    
 
}
 