import { Component, OnInit,AfterContentInit,ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AlertController} from '@ionic/angular';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
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

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<button> Cliccami </button>'+
      '</div>'+
      '</div>';

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

          var infoWindow = new google.maps.InfoWindow(
            {content: contentString, position: this.LtdLng});
          infoWindow.open(this.map);
            console.log('Clicked');
            
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
