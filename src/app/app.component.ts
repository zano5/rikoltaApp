import { Component } from '@angular/core';

import { Router } from '@angular/router'; 
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // title = 'firebaseLogin';
 
  // selectedVal: string;
  // responseMessage: string = '';
  // responseMessageType: string = '';
  // emailInput: string;
  // passwordInput: string;
  // isForgotPassword: boolean;
  // userDetails: any;

  constructor(
   private route:Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
   
  }

  ionViewDidLoad()
  {
console.log("Will Load")

firebase.auth().onAuthStateChanged(res=>{
  console.log("I am here",res.email)
  if(res)
  {
this.route.navigateByUrl('newhome')
  }
  else
  {
    this.route.navigateByUrl('signin')
  }
})
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  // Comman Method to Show Message and Hide after 2 seconds
  // showMessage(type, msg) {
  //   this.responseMessageType = type;
  //   this.responseMessage = msg;
  //   setTimeout(() => {
  //     this.responseMessage = "";
  //   }, 2000);
  // }
 
  // Called on switching Login/ Register tabs
  // public onValChange(val: string) {
  //   this.showMessage("", "");
  //   this.selectedVal = val;
  // }
  // Check localStorage is having User Data
  // isUserLoggedIn() {
  //   this.userDetails = this.authService.isUserLoggedIn();
  // }
 
  // SignOut Firebase Session and Clean LocalStorage
  // logoutUser() {
  //   this.authService.logout()
  //     .then(res => {
  //       console.log(res);
  //       this.userDetails = undefined;
  //       localStorage.removeItem('user');
  //     }, err => {
  //       this.showMessage("danger", err.message);
  //     });
  // }
 
  // Login user with  provided Email/ Password
  // loginUser() {
  //   this.responseMessage = "";
  //   this.authService.login(this.emailInput, this.passwordInput)
  //     .then(res => {
  //       console.log(res);
  //       this.showMessage("success", "Successfully Logged In!");
  //       this.isUserLoggedIn();
  //     }, err => {
  //       this.showMessage("danger", err.message);
  //     });
  // }
 
  // Register user with  provided Email/ Password
  // registerUser() {
  //   this.authService.register(this.emailInput, this.passwordInput)
  //     .then(res => {
 
        // Send Varification link in email
  //       this.authService.sendEmailVerification().then(res => {
  //         console.log(res);
  //         this.isForgotPassword = false;
  //         this.showMessage("success", "Registration Successful! Please Verify Your Email");
  //       }, err => {
  //         this.showMessage("danger", err.message);
  //       });
  //       this.isUserLoggedIn();
 
 
  //     }, err => {
  //       this.showMessage("danger", err.message);
  //     });
  // }
 
  // Send link on given email to reset password
  // forgotPassword() {
  //   this.authService.sendPasswordResetEmail(this.emailInput)
  //     .then(res => {
  //       console.log(res);
  //       this.isForgotPassword = false;
  //       this.showMessage("success", "Please Check Your Email");
  //     }, err => {
  //       this.showMessage("danger", err.message);
  //     });
  // }
 
}
