import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ActionSheetController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PopoverResultPage } from 'src/app/components/popover-result/popover-result.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

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
  chatRef: any;
  key: string;
  ref: any;
  downloadURL: any;
  id: string;
  uploadState: any;
  constructor(private fb: FormBuilder, public modalController: ModalController,
     public popoverController:PopoverController,
     public Storage: AngularFireStorage,
     public afAuth: AngularFireAuth,  private angularfire: AngularFirestore,
     public actionSheetController: ActionSheetController,
     ) { 
    this.register =  fb.group({
      // email: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      // ])),
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
    this.key = this.afAuth.auth.currentUser.uid;
    this.chatRef = this.angularfire.collection('documents',ref=>ref.orderBy('TimeStamp')).valueChanges();
   
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
  upload(event) {
    const file= event.target.files[0];
     this.id = Math.random().toString(36).substring(2);
    const filepath=this.id;
    this.ref = this.Storage.ref(filepath);
    const task = this.Storage.upload(filepath, file);
    this.uploadState = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL().subscribe(urlfile=>{
           console.log(urlfile);
           this.angularfire.collection('chats2').add({
            Name: this.afAuth.auth.currentUser.displayName,
            image:urlfile,
            UserID: this.afAuth.auth.currentUser.uid,
            TimeStamp:firebase.firestore.FieldValue.serverTimestamp(),
          });
         
          });
        })
      ).subscribe();
    }

}
