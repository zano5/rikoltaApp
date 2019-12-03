import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public modalController: ModalController) { }
  
  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      animated: true
    });
    return await modal.present();
  }

}
