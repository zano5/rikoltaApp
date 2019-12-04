import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  register: FormGroup;
  name: any;
  username: any;
  constructor(private fb: FormBuilder, public modalController: ModalController,
    ) { 
    this.register =  fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      number: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.required
      ])),
      altNumber: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.required
      ])),
      id: new FormControl('', Validators.compose([
        Validators.maxLength(13),
        Validators.required
      ])),
    })
  }

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
