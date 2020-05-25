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


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ AngularFireModule,AngularFireAuthModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    ],
  
  providers: [
    StatusBar,
    SplashScreen,
    { provide:  RouteReuseStrategy, useClass: IonicRouteStrategy ,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
