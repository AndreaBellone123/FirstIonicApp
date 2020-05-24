import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
 
@Component({
   selector: 'loginForm',
   templateUrl: './sign.component.html',
   styles: [``]
})
export class SignComponent implements OnInit { 
 
    invalidCredentialMsg: string;
    username:string;
    password:string;
    retUrl:string="/signedin/logged";
 
    constructor(private authService: AuthService, 
                private router: Router, 
                private activatedRoute:ActivatedRoute) {
    }
 
    ngOnInit() {
        this.activatedRoute.queryParamMap
                .subscribe(params => {
            this.retUrl = params.get('retUrl'); 
            console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
        });
    }
 
    onFormSubmit(form : NgForm) {

       this.authService.login(form.value.username, form.value.password).subscribe(data => {
           console.log( 'return to '+ this.retUrl);
           if (this.retUrl!=null) {
                this.router.navigate( [this.retUrl]);
           } else {
                this.router.navigate( ['home/home-comp']);
           }
       });
    }
} 