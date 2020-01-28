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
  constructor(private navCtrl: NavController, public afAuth: AngularFireAuth,private pagesService:PagesService,private db:AngularFirestore,) {  
    this.pages = this.pagesService.getPages();
  }

  ngOnInit() {


  }

  logOut(){
    if (this.pages.length >= 6) {
      this.pages.pop();
    }
    this.afAuth.auth.signOut();
    this.navCtrl.navigateForward('/signin'); 
  }

}
