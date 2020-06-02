import { Component, OnInit,AfterContentInit,ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AlertController} from '@ionic/angular';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import * as $ from 'jquery';
import{Observable} from 'rxjs';
import{map,take} from 'rxjs/operators';
import {UserService,user} from '../user.service';
declare var google;

@Component({
  selector: 'app-signedin',
  templateUrl: './signedin.page.html',
  styleUrls: ['./signedin.page.scss'],
})

export class SignedinPage implements OnInit{

  @ViewChild('map', { static: true }) mapElement;

  private utenti : Observable<user[]>;
  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  LtdLng = { lat: 40.269704, lng: 17.883726 };
  marker : any;
  posti : string = "24";
  
  constructor(public geolocation: Geolocation,public alert : AlertController,public user : UserService) {


    this.geolocation.getCurrentPosition().then((resp) => {

      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      this.mapOptions = {

        zoom: 15,
        center: this.mapCenter,
        mapTypeControl: false,
        streetViewControl:false,

      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

        this.marker = new google.maps.Marker({
          position: this.LtdLng,
          map: this.map,
      })

        this.marker.addListener('click',()=>{
          console.log('Marker clicked');
          var infoWindow = new google.maps.InfoWindow(
            {content: '<div>'+ '<img src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-fo_K9Wk76sg%2FV35A7i1qMoI%2FAAAAAAAABUk%2FpboHuOAPSB8jCA3vlsQKvEKLKFXRhxnFwCLcB%2Fs1600%2Fb.png&f=1&nofb=1" width="50" height="50" >' + 
            "Posti disponibili : " + this.posti  + '<br>' + '<br>' + 
            '<button style="background-color:blue;"  id="myInfoWinDiv">' + "Cliccami" + '</button>' 
            + '</div>', position: this.LtdLng});
          infoWindow.open(this.map);

          infoWindow.addListener('domready',function(){
            $('#myInfoWinDiv').click(function() {
               
                console.log('InfoWindow is ready to rumble');
            });
        })
        })
      }
)
    .catch((error) => {

      this.showAlert('Error getting location', error);
      
    });
  }

  ngOnInit(){

    this.utenti = this.user.getUtenti();
    
  }

async showAlert(header : string,message:string){

  const alert = await this.alert.create({
    
    header,
    message,
    buttons : ["Ok"]

  })

  await alert.present()

}


}
