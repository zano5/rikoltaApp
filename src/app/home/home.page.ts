import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
userplan ={}
  constructor() {
// var uid = firebase.auth().currentUser.uid

    firebase.firestore().collection("users").where("userid","==","13uvM2yc90PcQFIdEcolt0bjs772").get().then(res=>{
      res.forEach(val=>{

        
     
        this.userplan=val.data()
        console.log(this.userplan)
      })
    })
  }



}
