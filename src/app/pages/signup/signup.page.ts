import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
    ) { 
    this.register =  fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(18),
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
        Validators.minLength(13),
        Validators.required
      ])),
    })
  }

  ngOnInit() {
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
      plan:"none"
     }).catch(error=>{
       alert(error.message)
     })
     //  ---------------
 
     this.afAuth.auth.currentUser.updateProfile({
      displayName: this.register.value.name,
 
      }).then(()=> {
        this.router.navigateByUrl('signin');
        this.presentToast('Successfully signed up');
 
      }).catch(err=>{
        this.presentToast(err.message);
   })
    }).catch(err=>{
      this.presentToast(err.message);
    })
  }

}
