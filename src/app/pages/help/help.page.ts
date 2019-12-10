import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Popover1HelpPage } from 'src/app/components/popover1-help/popover1-help.page';
import { Popover2HelpPage } from 'src/app/components/popover2-help/popover2-help.page';
import { Popover3HelpPage } from 'src/app/components/popover3-help/popover3-help.page';
import { Popover4HelpPage } from 'src/app/components/popover4-help/popover4-help.page';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  async popoverOverview() {
    const popover = await this.popoverController.create({
      component: Popover1HelpPage,
      translucent: true,
      animated: true
    });

    setTimeout(function () {
      popover.dismiss();
      window.location.reload(true);
    }, 15000);

    return await popover.present();
  }

  async popoverClaim() {
    const popover = await this.popoverController.create({
      component: Popover2HelpPage,
      translucent: true
    });

    setTimeout(function () {
      popover.dismiss();
      window.location.reload(true);
    }, 15000);
      
    return await popover.present();
  }

  async popoverApply() {
    const popover = await this.popoverController.create({
      component: Popover3HelpPage,
      translucent: true
    });

    setTimeout(function () {
      popover.dismiss();
      window.location.reload(true);
    }, 15000);

    return await popover.present();
  }

  async popoverContact() {
    const popover = await this.popoverController.create({
      component: Popover4HelpPage,
      translucent: true
    });

    setTimeout(function () {
      popover.dismiss();
      window.location.reload(true);
    }, 15000);

    return await popover.present();
  }

}
