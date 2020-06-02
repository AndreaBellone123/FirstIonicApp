import { Component} from '@angular/core';
import { UserService } from '../user.service';
import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage{

  elementType = 'url';
  value = '';
  scannedCode = null;

  constructor(private userService : UserService,private barcodeScanner : BarcodeScanner,private toastCtrl : ToastController) {


  }
  
  
  scanCode(){ 
    this.barcodeScanner.scan().then(barcodeData =>{
      this.scannedCode = barcodeData.text;
    })
  }

}
 
 
