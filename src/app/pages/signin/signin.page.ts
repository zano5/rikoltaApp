import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service'; 
import { ToastController } from '@ionic/angular'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { PagesService, User } from 'src/app/service/pages.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserData{
  plan:string;
  displayName: string;
  userid: string;
  email: string;
  members: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  userid:string;
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
  
  users:any = []; 
  user;
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

  SingIn(){  

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((user) =>{
      this.router.navigateByUrl('/menu/main') 
      this.presentToast('Successfully signed in');
      this.loginForm.reset();   
      // var userid = this.authService.getUID();  
      var userId = user.user.uid;
      console.log(userId);  

      this.db.doc<UserData>('users/'+userId).valueChanges().subscribe(userDoc =>{ 
        if(userDoc.plan != 'none' && this.pages.length == 5){
          this.pages.push({title:'Policy',url:'/menu/policy',icon:'book'}) 
        }
      })
      // this.db.collection('users').snapshotChanges().subscribe(data => { 

        // console.log(data)
        // this.user = data.map(e => { 
        //   return{
        //     key: e.payload.doc.id,
        //     ...e.payload.doc.data()
            
        //   } 
        // }); 
    //     this.user.forEach(element => {
    //       if (userid == element.key && element.plan != "none" && this.pages.length >= 5 && this.pages.length <= 5) { 
    //         console.log('add it'+element.plan+' '+userid);
    //         this.pages.push({title:'Policy',url:'/menu/policy',icon:'book'}) 
    //       }
    //     }); 
    //   })   
      
    // }).catch(err=>{
    //  this.presentToast(err.message);
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
