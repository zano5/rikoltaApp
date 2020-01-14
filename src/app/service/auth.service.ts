import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userDetails(): any {
  //   throw new Error("Method not implemented.");
  // }
  constructor(private afs: AngularFirestore, 
    private router: Router,
     public afAuth: AngularFireAuth,
    //  public angularFireAuth:AngularFireAuth,
      private alertCtrl : AlertController ) { 
    // afAuth.auth.onAuthStateChanged((user)=>{
    //   if(user){
    //     this.router.navigateByUrl("menu");
    //   }else{
    //     this.router.navigateByUrl("signin");
    //   }
    // })
    // this.afAuth.authState.subscribe(userResponse => {
    //   if (userResponse) {
    //     localStorage.setItem('user', JSON.stringify(userResponse));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // })
  }

  // async login(email: string , password: string){
  //   await this.afAuth.auth.signInWithEmailAndPassword(email,password).then((success)=>{
  //      console.log(success);
  //    }).catch((error)=>{
  //      console.log(error)
  //    })

  // }
   
  //  async signup(email, password){
  //   await this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((success)=>{
  //     console.log(success);
  //   }).catch((error)=>{
  //    console.log(error)
  //   })
  // }
  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
 
  async signup(email: string, password: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
   registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
   
   userDetails(){
    return firebase.auth().currentUser;
  }
   
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
  //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  getUID(): string {
    return this.afAuth.auth.currentUser.uid;
  }


  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
 
  async logout(){
    await this.afAuth.auth.signOut().then((success)=>{
      console.log(success);
      console.log("success");
      this.router.navigateByUrl("signin");
    }).catch((error)=>{
      console.log(error)
    })
  }
}
