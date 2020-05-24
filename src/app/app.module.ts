import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AuthService} from './auth/auth.service';
import{routes} from './app-routing.module';
import { AuthGuardService } from './auth/auth-guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AngularFirestoreModule,AngularFireAuthModule,AngularFireStorageModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,RouterModule.forRoot(routes),AngularFireModule.initializeApp(environment.firebase)],
  providers: [
    AuthService,
    AuthGuardService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
