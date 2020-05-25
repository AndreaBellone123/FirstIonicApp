import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username: string = ""
	password: string = ""

	constructor(public afAuth: AngularFireAuth,public router: Router,public alert : AlertController) { }

	ngOnInit() {
	}

	async login() {
		const { username, password } = this
		try {
      const res = await this.afAuth.signInWithEmailAndPassword(username , password)

      this.router.navigate(['/signedin'])
      this.showAlert("Successo","Entra nell'area riservata")

		
		} catch(err) {
      console.dir(err)
      
      if(err.code === 'auth/user-not-found') {
        this.showAlert("Errore","Utente non trovato")

      }

      if(err.code === 'auth/wrong-password'){
        this.showAlert("Errore","Password Errata")

      }

      if(err.code === 'auth/invalid-email') {
        this.showAlert("Errore","Email non valida")
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