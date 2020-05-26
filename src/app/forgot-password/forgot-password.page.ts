import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  username: string = ""


  constructor( public afAuth: AngularFireAuth , public alert : AlertController , public router: Router ) { }

  ngOnInit() {
  }

  async forgot() {
		const { username} = this
		try {

      const res = await this.afAuth.sendPasswordResetEmail(username)
      this.showAlert("Successo","Controlla la casella di posta elettronica per resettare la password ed effettua il login")
      this.router.navigate(['/login'])

		
		} catch(err) {
      console.dir(err)

      if(this.username === ""){
        this.showAlert("Errore","Inserire una email valida")

      }
      
      else if(err.code === 'auth/user-not-found') {
        this.showAlert("Errore","Account non trovato")

      }

     else if(err.code === 'auth/invalid-email') {
        this.showAlert("Errore","L'email inserita non è valida")
      }

      else {
        this.showAlert("Errore","Si è verificato un errore inaspettato durante il recupero delle tue credenziali,riprova più tardi")
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
