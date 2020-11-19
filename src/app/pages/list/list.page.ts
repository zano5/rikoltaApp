import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ActionSheetController, AlertController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PopoverResultPage } from 'src/app/components/popover-result/popover-result.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/service/auth.service'; 
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  register: FormGroup;
  ionicForm: FormGroup;
  isSubmitted = false;
  value:any;
  defaultDate = "1987-06-30";
  public loginForm: FormGroup;
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
  list: any;
  image: any;


  constructor(private fb: FormBuilder, public modalController: ModalController,
     public popoverController:PopoverController,
     public Storage: AngularFireStorage,
     public afAuth: AngularFireAuth, 
      private angularfire: AngularFirestore,
     public actionSheetController: ActionSheetController,
       public alertController: AlertController,
       public router:Router,
       private authService: AuthService,
       public FormBuilder: FormBuilder,
       public loadingController: LoadingController,
       
     ) { 

  }

  ngOnInit() {
    this.ionicForm = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
      surname: ['', [Validators.required, Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
      mobile: ['', [Validators.required,Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      mobile2: ['', [Validators.required,Validators.minLength(10), Validators.pattern('^[0-9]+$')]],  
      id: ['', [Validators.required,Validators.minLength(13), Validators.pattern('^[0-9]+$')]],
    })
  }  

  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.presentPopover();
    }

  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverResultPage,
      translucent: true
    });
    return await popover.present();
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({ 
      duration: 9000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
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
    const file = event.target.files[0];
    this.id = Math.random().toString(36).substring(2);
    const filepath = this.id;
    this.ref = this.Storage.ref(filepath);
    const task = this.Storage.upload(filepath, file);
    this.uploadState = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL().subscribe(urlfile=>{
           console.log(urlfile);

            this.image = urlfile
          });
        })
      ).subscribe();
      if (this.downloadURL == undefined) {
        this.presentLoadingWithOptions();
      }
    }
    

    submit(){
      const userid = this.afAuth.auth.currentUser.uid;
  
        this.angularfire.collection('claims doc').add({
          ClaimNumber:Math.floor(100000 + Math.random() * 900000),
         ID: this.ionicForm.value.id,
         ClaimentName: this.ionicForm.value.name,
         Surname:this.ionicForm.value.surname,
          Number: this.ionicForm.value.mobile,
          AltNumber: this.ionicForm.value.mobile2,
          userid: this.afAuth.auth.currentUser.uid,
          image: this.image,
          TimeStamp:firebase.firestore.FieldValue.serverTimestamp(),
          
        }).then(() => {
          this.presentPopover();
          this.router.navigateByUrl('/newhome')
          ;
        }).catch(err =>{
          alert(err.message)
        })
        this.afAuth.auth.currentUser.updateProfile({
          displayName: this.ionicForm.value.name,
        })

    }
  
    
  }


