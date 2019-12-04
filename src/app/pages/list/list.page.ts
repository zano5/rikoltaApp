import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PopoverResultPage } from 'src/app/components/popover-result/popover-result.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  
  register: FormGroup;
  name: any;
  username: any;
  public lunch: string;
  public refreshments: string;
  hide: boolean = false;
 
  constructor(private fb: FormBuilder, public modalController: ModalController, public popoverController:PopoverController) { 
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
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverResultPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      animated: true
    });

    modal.onWillDismiss().then(dataReturned => {
      this.lunch = dataReturned.data;
      this.refreshments = dataReturned.role;
    });
    return await modal.present();
  }
  

  ngIfCtrl(){
    this.hide = !this.hide
  }

}
