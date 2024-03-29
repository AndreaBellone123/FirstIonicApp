import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import{routes} from './app-routing.module';
import firebaseConfig from './firebase';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { UserService } from './user.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode/';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AngularFirestoreModule,AngularFireModule,AngularFireAuthModule,BrowserModule ,IonicModule.forRoot(), AppRoutingModule,RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    ],
  
  providers: [
    
    NgxQRCodeModule,
    StatusBar,
    SplashScreen,
    { provide:  RouteReuseStrategy, useClass: IonicRouteStrategy ,
      },UserService,BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
