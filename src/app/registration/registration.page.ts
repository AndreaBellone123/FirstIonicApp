import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword : string  = ""

  constructor( public afAuth: AngularFireAuth,public router: Router,public alert : AlertController) { }

  ngOnInit() {
  }

  async signup() {
    const { username, password , cpassword } = this
    
    if(password !== cpassword){
      this.showAlert("Errore","Le password inserite non corrispondono")
    }

		try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username , password)
      console.log(res)
      this.showAlert("Successo","Account creato con successo,effettua il login")

      this.router.navigate(['/login'])

		
    } 
      catch(err) {
      console.dir(err)

      if(err.code === 'auth/email-already-in-use') {

        this.showAlert("Errore","Account già esistente,effettua il login")
        this.router.navigate(['/login'])

      }
      
     else if(err.code === 'auth/invalid-email') {
        this.showAlert("Errore","Email non valida")
      }

      else {  

        this.showAlert("Errore","Si è verificato un errore durante la creazione dell'account")
        this.router.navigate(['/registration'])

      }
		}
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
