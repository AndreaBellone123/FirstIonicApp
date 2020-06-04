import { Component} from '@angular/core';
import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import{Observable} from 'rxjs';
import {UserService,user} from '../user.service';
import { Router ,ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage{

  elementType = 'url';
  value = '';
  scannedCode = null;
  private utenti : Observable<user[]>;


  constructor(private userService : UserService,private barcodeScanner : BarcodeScanner,private toastCtrl : ToastController,private afRoute : ActivatedRoute) {


  }

  ngOnInit(){

    this.utenti = this.userService.getUtenti();
    console.log(this.afRoute.snapshot.paramMap.get('username'));
    console.log(this.afRoute.snapshot.paramMap.get('password'));


  }
  
  
  scanCode(){ 
    this.barcodeScanner.scan().then(barcodeData =>{
      this.scannedCode = barcodeData.text;
    })
  }

}
 
 
