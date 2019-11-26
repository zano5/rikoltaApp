import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
