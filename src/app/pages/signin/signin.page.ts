import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  loading: HTMLIonLoadingElement;
  facebook: any;
  // facebook: any;
  // public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  public loginForm: FormGroup;
  public forgotpasswordForm: FormGroup;
  isForgotPassword: boolean = true;
  userDetails: any;

  constructor(private fb: FormBuilder,
    private router: Router, 
   private authService: AuthService,
    private alertCtrl: AlertController,


     ) { 
      this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      });
  
      this.forgotpasswordForm = fb.group({
        email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      })
     }

  ngOnInit() {
  }

  loginUser(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(() =>{
      this.router.navigateByUrl('/menu/main')
      
    }).catch(err=>{
      alert(err.message)
    })
  }

  forgotpassword() {
    this.isForgotPassword = false;
  }
  Cancel(){
    this.isForgotPassword = true;
  }
  reset() {
    this.authService.sendPasswordResetEmail(this.forgotpasswordForm.value.email)
    .then((success)=>{
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Check your Email account',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
      this.isForgotPassword=true;
    }).catch((error)=>{
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Wrong Email',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
    })  
  }
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }
  public onValChange(val: string) {
    this.showMessage("", "");
    this.selectedVal = val;
  }
 
  // Check localStorage is having User Data
  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }
  loginUser1() {
    this.responseMessage = "";
    this.authService.login(this.emailInput, this.passwordInput)
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In!");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
}
