import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-result',
  templateUrl: './popover-result.page.html',
  styleUrls: ['./popover-result.page.scss'],
})
export class PopoverResultPage implements OnInit {

  constructor(private popoverController:PopoverController) { }

  ngOnInit() {
  }
  closePopover(){
    this.popoverController.dismiss();
  }

}
