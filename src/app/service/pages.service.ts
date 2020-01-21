import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PagesService {
  private pages = [];
  constructor() {
    this.pages = [
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
   }
   getPages(){
     return this.pages;
   }
}
