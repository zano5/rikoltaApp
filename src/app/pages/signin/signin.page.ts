import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service'; 
import { ToastController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { PagesService } from 'src/app/service/pages.service';

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
  pages = [];
  users = [];
  constructor(private fb: FormBuilder,
    private router: Router, 
   private authService: AuthService,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    private db:AngularFirestore,
    private angularFireAuth:AngularFireAuth,
    private pagesService:PagesService
     ) { 
      this.pages = this.pagesService.getPages();
      this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(18), Validators.required])],
      });
  
      this.forgotpasswordForm = fb.group({
        email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
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

  loginUser(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(() =>{
      this.router.navigateByUrl('/menu/main') 
      this.presentToast('Successfully signed in');
      this.loginForm.reset(); 
      var user = this.angularFireAuth.auth.currentUser;  
      console.log(user.uid);  
      this.db.collection('users').snapshotChanges().subscribe(data => {
        this.users = data.map(e => {
          return{
            key: e.payload.doc.id,
            ...e.payload.doc.data()
          } 
        });
        this.users.forEach(element => {
          console.log(element);
          if (user.uid == element.key && element.plan != "none" && this.pages.length >= 5 && this.pages.length <= 5) {
            this.pages.push({title:'Policy',url:'/menu/policy',icon:'book'})
          }
        });
        
      })
    }).catch(err=>{
     this.presentToast(err.message);
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
