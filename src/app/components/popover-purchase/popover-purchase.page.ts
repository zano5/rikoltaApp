import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-purchase',
  templateUrl: './popover-purchase.page.html',
  styleUrls: ['./popover-purchase.page.scss'],
})
export class PopoverPurchasePage implements OnInit {

  constructor(private popoverController:PopoverController) { }

  ngOnInit() {
  }
  closePopover(){
    this.popoverController.dismiss();
  }
}
