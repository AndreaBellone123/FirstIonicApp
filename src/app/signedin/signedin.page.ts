import { Component, OnInit,AfterContentInit,ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AlertController} from '@ionic/angular';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import * as $ from 'jquery';
declare var google;

@Component({
  selector: 'app-signedin',
  templateUrl: './signedin.page.html',
  styleUrls: ['./signedin.page.scss'],
})

export class SignedinPage{

  @ViewChild('map', { static: true }) mapElement;
  
  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  LtdLng = { lat: 40.269704, lng: 17.883726 };
  marker : any;
  
  constructor(public geolocation: Geolocation,public alert : AlertController) {

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
            {content: '<div>'+ "Ciao" + '<br>' + '<br>' + '<button  id="myInfoWinDiv">' + "Cliccami" + '</button>' + '</div>', position: this.LtdLng});
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

async showAlert(header : string,message:string){

  const alert = await this.alert.create({
    
    header,
    message,
    buttons : ["Ok"]

  })

  await alert.present()

}


}
