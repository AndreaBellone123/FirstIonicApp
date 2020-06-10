import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
// import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username : string = "";
  password : string = "";
  lat_destinazione : any;
  lng_destinazione : any;
  data : any;



  constructor(public firebase : AngularFireAuth,public activatedRoute : ActivatedRoute,public angularAuth : AngularFireAuth,public  router : Router,public alert : AlertController) { }

  ngOnInit() {

     // Using Observable

     this.activatedRoute.paramMap.subscribe(params => { 
      this.username = params.get('username'); 
      this.password=params.get('password');
      this.password=params.get('data');
      this.lat_destinazione=params.get('lat_destinazione');
      this.lng_destinazione=params.get('lng_destinazione');

      console.log(this.username);
      console.log(this.password);
      console.log(this.data);
      console.log(this.lat_destinazione);
      console.log(this.lng_destinazione);


  });

  }

  cancellaAccount(){
    
    if(confirm('Are you sure about that??') == true){

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
        
          // user.delete;
      
        } else {
        
          console.log('User signed out')
        }
      });

      console.log('True')
    }

    else {
      console.log('False')
    }
    
    
  }

  async showAlert(header : string,message:string){

    const alert = await this.alert.create({
      header,
      message,
      buttons : ["Ok"],

    })

    await alert.present()

  }


  logOut(){
    this.firebase.signOut().then(function() {
      // Sign-out successful.
      console.log('Sign-out successful.');

    }, function(error) {
        console.log(error);
    });

    this.router.navigate(['/home'])
  }

  /*showAlertButtons(){


    alertifyjs.confirm("This is a confirm dialog.",
  function(){
    alertifyjs.success('Ok');
  },
  function(){
    alertifyjs.error('Cancel');
  });
      

}
*/

}
