import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router ,ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {AngularFirestore,AngularFirestoreCollection,DocumentReference} from '@angular/fire/firestore';
import{UserService} from'../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  name : string = ""
  surname : string  = ""
  username: string = ""
  password: string = ""


  constructor( public afAuth: AngularFireAuth,public router: Router,public alert : AlertController,
    public afstore : AngularFirestore,public user : UserService) {


     }

  ngOnInit() {

  }

  async signup() {

    const { name , surname , username, password} = this



		try {

      const res = await this.afAuth.createUserWithEmailAndPassword(username , password)

      if(res.user && res.user.emailVerified === false) {

        res.user.sendEmailVerification()
        
        this.showAlert("Successo","E' stata inviata una email di conferma all'indirizzo di posta elettronica fornito")

      }
      
      console.log(res)

      this.afstore.doc(`utenti/${res.user.uid}`).set({
        username,
        admin : false

      })

      this.user.setUser({
        username ,
        uid: res.user.uid

      })
      
      this.router.navigate(['/login'])

    } 
      catch(err) {

      console.dir(err)

      if(this.name === "") {

        this.showAlert("Errore","Inserisci un nome valido")

      }

      else if(this.surname === "") {

        this.showAlert("Errore","Inserisci un cognome valido")

      }
    
      else if(err.code === 'auth/email-already-in-use') {

        this.showAlert("Errore","Account già esistente,effettua il login")
        this.router.navigate(['/login'])

      }
      
     else if(err.code === 'auth/invalid-email') {

        this.showAlert("Errore","Email non valida")

      }

      else if(err.code === 'auth/weak-password') {

        this.showAlert("Errore","La password deve contenere almeno sei caratteri")

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