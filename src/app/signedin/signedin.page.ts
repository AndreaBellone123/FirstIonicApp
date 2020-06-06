import { Component,ElementRef,AfterViewInit, OnInit,AfterContentInit,ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AlertController} from '@ionic/angular';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import{FormBuilder,FormGroup, FormControl,ReactiveFormsModule,Validators} from '@angular/forms';
import * as $ from 'jquery';
import { AngularFireAuth } from '@angular/fire/auth'
import{Router}from '@angular/router'
declare var google;


@Component({
  selector: 'app-signedin',
  templateUrl: './signedin.page.html',
  styleUrls: ['./signedin.page.scss'],
})

export class SignedinPage implements OnInit,AfterViewInit{

  @ViewChild('map', { static: true }) mapElement;
  @ViewChild('start', { static: true }) startElement;
  @ViewChild('end', { static: true }) endElement;
  @ViewChild('content',{static : true}) divElement;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm : FormGroup;


  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  LtdLng = { lat: 40.269704, lng: 17.883726 };
  marker : any;
  isActive : any = false;
  username : any =  "";
  password : any = "";
  isSelected : any = true;
  cardActive : any = true;

  
  constructor(public fControl :FormControl,public fb : FormBuilder,public afAuth:AngularFireAuth,public geolocation: Geolocation,public alert : AlertController,public router: Router) {


    this.createDirectionForm();

  }

createDirectionForm(){
  this.directionForm = this.fb.group({
    destination : ['',Validators.required]
  });
}

ngOnInit(){

}

ngAfterViewInit() : void{

  
  this.geolocation.getCurrentPosition().then((resp) => {

    this.mapCenter.lat = resp.coords.latitude;
    this.mapCenter.lng = resp.coords.longitude;
    this.mapOptions = {

      zoom: 15,
      center: this.mapCenter,
      disableDefaultUI: true,

    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

    this.directionsDisplay.setMap(this.map);

      this.marker = new google.maps.Marker({
        position: this.LtdLng,
        map: this.map,
    })

      this.marker.addListener('click',()=>{
        console.log('Marker clicked');
        this.isActive = true;
        this.isSelected = false;  
        this.cardActive = false;
        
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
  this.afAuth.onAuthStateChanged(function(user) {

    if (user) {
      // user.delete();      
      console.log(user + " has logged in")

      
    } else {
      console.log('no users found')
    }
  });

  this.router.navigate(['/reservations',{username : username,password : password,si : true}]);



}

calculateAndDisplayRoute(formValues) {
  const that = this;
  this.directionsService.route({
    origin: this.mapCenter,
    destination: formValues.destination,
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      that.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


  chiudiFinestra(){
    console.log('Chiuso')
    this.isActive = false;
    this.isSelected = true;
    this.cardActive = true;

  }

}
