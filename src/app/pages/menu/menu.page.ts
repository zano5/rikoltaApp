import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  pages = [
    {
      title: 'Home',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Claims',
      url: '/menu/list',
      icon: 'bookmarks',
    },
    {
      title: 'Apply',
      url: '/menu/apply',
      icon: 'cart',
    },
    {
      title: 'Contact us',
      url: '/menu/contact',
      icon: 'call',
    },
    {
      title: 'Help',
      url: '/menu/help',
      icon: 'help',
    },
  ];
  constructor(private navCtrl: NavController, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logOut(){

    this.afAuth.auth.signOut();
    this.navCtrl.navigateForward('/signin'); 
  }

}
