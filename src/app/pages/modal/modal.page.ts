import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(public modalController: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async closeModal(food, drinks){
    console.info("Selected:",food, drinks);
    await this.modalController.dismiss(food, drinks);   
    // window.location.reload(true);
  }

}
