import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  pages = [
    {
      title: 'Main',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/menu/list',
      icon: 'list',
      // children: [

      // ]
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
