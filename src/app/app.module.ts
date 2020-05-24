import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

/* // Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
 
// Creates a client
const storage = new Storage();

// Creates a client from a Google service account key.
// const storage = new Storage({keyFilename: "key.json"});

const bucketName = 'ionic-form-ui';
 
async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}
 
createBucket().catch(console.error);

*/

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AngularFirestoreModule,AngularFireStorageModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebase)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
