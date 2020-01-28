import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  users = [];
  policy;
  policyPrice;
  policyMembers;

  constructor(private db:AngularFirestore,
    private angularFireAuth:AngularFireAuth,) { 

    }

  ngOnInit() {

  }
  ionViewWillEnter(){
    var user = this.angularFireAuth.auth.currentUser;  
    this.db.collection('users').snapshotChanges().subscribe(data => {
      this.users = data.map(e => {
        return{
          key: e.payload.doc.id,
          data: e.payload.doc.data()
        } 
      }); 
      this.users.forEach(element => {
        if(user.uid == element.key){
          this.policy = element.data.plan;
          this.policyMembers = element.data.members;
        }
      });
      if (this.policy == "Standard Plan") {
        this.policyPrice = 150;
      }else if (this.policy == "Premium Plan") {
        this.policyPrice = 200;
      }
      console.log(this.policy +' - '+this.policyPrice);
    })
  }

}
