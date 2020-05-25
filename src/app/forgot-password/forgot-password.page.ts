import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  username: string = ""


  constructor( public afAuth: AngularFireAuth ) { }

  ngOnInit() {
  }

  async forgot() {
		const { username} = this
		try {

      const res = await this.afAuth.sendPasswordResetEmail(username)
      alert("Controlla la casella di posta elettronica per resettare la password")
		
		} catch(err) {
      console.dir(err)
      
      if(err.code === 'auth/user-not-found') {
        alert('Utente non trovato')

      }

      if(err.code === 'auth/wrong-password'){
        alert('Password errata')
      }

      if(err.code === 'auth/invalid-email') {
        alert("L' " + "email inserita non è valida")
      }

		
		}
	}

}
