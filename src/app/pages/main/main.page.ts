import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
    
  }
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
  };
  toClaims(){
    this.route.navigateByUrl('menu/list');
  }
  toApply(){
    this.route.navigateByUrl('menu/apply');
  }
  toContact(){
    this.route.navigateByUrl('menu/contact');
  }
  toHelp(){
    this.route.navigateByUrl('menu/help');
  }

}
