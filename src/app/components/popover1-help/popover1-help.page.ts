import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover1-help',
  templateUrl: './popover1-help.page.html',
  styleUrls: ['./popover1-help.page.scss'],
})
export class Popover1HelpPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 300
  };
}
