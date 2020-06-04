import { Component, OnInit,AfterContentInit,ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AlertController} from '@ionic/angular';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import * as $ from 'jquery';
import{Router}from '@angular/router'
declare var google;

@Component({
  selector: 'app-signedin',
  templateUrl: './signedin.page.html',
  styleUrls: ['./signedin.page.scss'],
})

export class SignedinPage{

  @ViewChild('map', { static: true }) mapElement;
  @ViewChild('content',{static : true}) divElement;


  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  LtdLng = { lat: 40.269704, lng: 17.883726 };
  marker : any;
  isActive : any = false;
  username : any =  "";
  password : any = "";
  isSelected : any = true;

  
  constructor(public geolocation: Geolocation,public alert : AlertController,public router: Router) {




    this.geolocation.getCurrentPosition().then((resp) => {

      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      this.mapOptions = {

        zoom: 15,
        center: this.mapCenter,
        disableDefaultUI: true

      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

        this.marker = new google.maps.Marker({
          position: this.LtdLng,
          map: this.map,
      })

        this.marker.addListener('click',()=>{
          console.log('Marker clicked');
          this.isActive = true;
          this.isSelected = false;  

          
        })
      }
)
    .catch((error) => {

      this.showAlert('Error getting location', error);
      
    });
  }

async showAlert(header : string,message:string){

  const alert = await this.alert.create({
    
    header,
    message,
    buttons : ["Ok"]

  })

  await alert.present()

}

reservations(){

  const { username, password } = this

  this.showAlert("Successo", "Username : " + username +  "Password : " + password);
  this.router.navigate(['/reservations',{username : username,password : password,si : true}]);

}


  chiudiFinestra(){
    console.log('Chiuso')
    this.isActive = false;
    this.isSelected = true;
  }


}
