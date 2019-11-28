import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  register: FormGroup;
  name: any;
  username: any;
  
  constructor(private fb: FormBuilder,
     private angularfire: AngularFirestore,
    private authService: AuthService,
     private afAuth: AngularFireAuth,
    private router: Router,
    ) { 
    this.register =  fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      // gender: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      id: new FormControl('', Validators.compose([
        Validators.maxLength(13),
        Validators.required
      ])),
    })
  }

  ngOnInit() {
  }

  registerUser(){
    this.authService.signup(this.register.value.email, this.register.value.password).then((value) =>{
      localStorage.setItem('userid', this.afAuth.auth.currentUser.uid)
 
      
     //  ---------------
     this.angularfire.collection('users').doc(this.afAuth.auth.currentUser.uid).set({
      displayName: this.register.value.name,
      email: this.register.value.email,
      id: this.register.value.id,
      userid: this.afAuth.auth.currentUser.uid,
     }).catch(error=>{
       alert(error.message)
     })
     //  ---------------
 
     this.afAuth.auth.currentUser.updateProfile({
      displayName: this.register.value.name,
 
      }).then(()=> {
        this.router.navigateByUrl('signin');
 
      }).catch(err=>{
 alert(err.message)   
   })
    }).catch(err=>{
      alert(err.message)
    })
  }

}
