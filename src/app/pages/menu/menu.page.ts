import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { PagesService } from 'src/app/service/pages.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit { 

  pages = [];
  users = [];
  // pages = [
  //   {
  //     title: 'Home',
  //     url: '/menu/main',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Claims',
  //     url: '/menu/list',
  //     icon: 'bookmarks',
  //   },
  //   {
  //     title: 'Apply',
  //     url: '/menu/apply',
  //     icon: 'cart',
  //   },
  //   {
  //     title: 'Contact us',
  //     url: '/menu/contact',
  //     icon: 'call',
  //   },
  //   {
  //     title: 'Help',
  //     url: '/menu/help',
  //     icon: 'help',
  //   }, 
  // ];
  constructor(private navCtrl: NavController, public afAuth: AngularFireAuth,private pagesService:PagesService,private db:AngularFirestore,) {  
    this.pages = pagesService.getPages();
  }

  ngOnInit() {
    var user = this.afAuth.auth.currentUser;  
    console.log(user.uid);  
    this.db.collection('users').snapshotChanges().subscribe(data => {
      this.users = data.map(e => {
        return{
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        } 
      });
      this.users.forEach(element => {
        if (user.uid == element.key && element.plan != "") {
          this.pages.push({title:'Policy',url:'/menu/policy',icon:'book'})
        }
      });
      
    })

  }

  logOut(){
    if (this.pages.length >= 6) {
      this.pages.pop();
    }
    this.afAuth.auth.signOut();
    this.navCtrl.navigateForward('/signin'); 
  }

}
