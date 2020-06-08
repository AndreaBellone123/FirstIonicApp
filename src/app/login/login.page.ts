  
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import { UserService } from '../user.service';
import { AngularFireModule } from '@angular/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

	username: string = ""
  password: string = ""
  i : any

	constructor(public firebase : AngularFireAuth,public afAuth: AngularFireAuth,public router: Router,public alert : AlertController,public user : UserService) { }

	ngOnInit() {

	}

	async login() {

    const { username, password } = this
    
		try {

      const res = await this.afAuth.signInWithEmailAndPassword(username , password)

      if(res.user) {

        this.user.setUser({
          username ,
          uid: res.user.uid

        })

        this.firebase.onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            console.log(email);
            console.log(uid);
            // ...
          } else {
            // User is signed out.
            // ...
          }
        });


        if(res.user.emailVerified === true ) {

          this.router.navigate(['/signedin'])


        
          this.showAlert("Successo","Entra nell'area riservata")
  
        }

        else {

          this.showAlert("Errore","Verifica il tuo indirizzo email prima di proseguire")

        }

      }
		
    } 
      catch(err) {

      console.dir(err)

      if(this.username === ""){

        this.showAlert("Errore","Inserire nome utente")

      }

     else if(this.password === ""){

        this.showAlert("Errore","Inserire password")
        
      }
      
      else if(err.code === 'auth/user-not-found') {
        this.showAlert("Errore","Utente non trovato")

      }

      else if(err.code === 'auth/wrong-password'){
        this.showAlert("Errore","Password Errata")

      }

      else if(err.code === 'auth/invalid-email') {
        this.showAlert("Errore","Email non valida")
      }

      else {
        this.showAlert("Errore","Si è verificato un errore durante l'accesso all'account,riprova più tardi")
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
