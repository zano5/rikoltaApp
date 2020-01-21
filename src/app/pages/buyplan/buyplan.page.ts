import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular'; 
import { PopoverPurchasePage } from 'src/app/components/popover-purchase/popover-purchase.page';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { PopoverResultPage } from 'src/app/components/popover-result/popover-result.page';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-buyplan',
  templateUrl: './buyplan.page.html',
  styleUrls: ['./buyplan.page.scss'],
})
export class BuyplanPage implements OnInit {
  ionicForm: FormGroup;
  membersForm:FormGroup;
  isSubmitted = false;

  fullname = [];
  ID = [];
  pricePlan:string;
  form:number;
  planMember = [];
  buyerAddress = {};
  constructor(public FormBuilder: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute,
    private popoverController:PopoverController,private angularfire: AngularFirestore,    public afAuth: AngularFireAuth ) {
    this.form = 1;
   }

  ngOnInit() { 
    this.activatedRoute.params.subscribe((data) =>{
      this.pricePlan = data.plan;
      if(this.pricePlan == 'Standard Plan'){
         for (let index = 1; index <= 10; index++) {
           this.planMember.push('Member '+index)
           
         }
      }
      if(this.pricePlan == 'Premium Plan'){
       for (let index = 1; index <= 15; index++) {
         this.planMember.push('Member '+index)
         
       }
    }
    }) ;
    this.membersForm = this.FormBuilder.group({
      members: this.FormBuilder.array([
        this.addingFields()
      ])
    })
    this.ionicForm = this.FormBuilder.group({
      Fullname: ['', [Validators.required, Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], 
      mobilenumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
      income: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[0-9]+$')]],
      ID: ['', [Validators.required, Validators.minLength(13),Validators.pattern('^[0-9]+$')]],
      addressline1:[''],
      addressline2:[''],
      addresscity:[''],
      addressstate:[''],
      addresszipcode:[''],
    }); 

  } 
  addNewInputField(member){   
    const control = <FormArray>this.membersForm.controls.members;
    if (control.length < this.planMember.length) {
      control.push(this.addingFields());
    }
    
  }
  RemoveInputField(i:number){

    const control = <FormArray>this.membersForm.controls.members;
    if (control.length < this.planMember.length) {
      control.removeAt(i);
    }
    
  }
  addingFields(): FormGroup {
    return this.FormBuilder.group({
      memberName: ['',[Validators.required, Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
      memberID: ['', [Validators.required, Validators.minLength(13),Validators.pattern('^[0-9]+$')]]
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  Next(){ 
    if (this.form < 2) {
      
      this.form += 1;
    }else{ 
      
      console.log(this.fullname);
      console.log(this.ID);
      this.presentPopover();
      this.router.navigateByUrl('/menu/main')

    } 
  } 
  submit(){
  
    this.buyerAddress = {
      addressline1:this.ionicForm.value.addressline1,
      addressline2:this.ionicForm.value.addressline2,
      addresscity:this.ionicForm.value.addresscity,
      addressstate:this.ionicForm.value.addressstate,
      addresszipcode:this.ionicForm.value.addresszipcode,
    }
    console.log(this.ionicForm.value);
    console.log(this.membersForm.value.members);  
    this.angularfire.collection('Purchase').add({
      BuyerFullName:this.ionicForm.value.Fullname,
      BuyerMobileNumber:this.ionicForm.value.mobilenumber,
      BuyerEmail:this.ionicForm.value.email,
      BuyerID:this.ionicForm.value.ID,
      BuyerAddress:this.buyerAddress,
      BuyerMembers:this.membersForm.value.members,
      BuyerPolicy:this.pricePlan,
      BuyerUserID:this.afAuth.auth.currentUser.uid
    });
    this.router.navigateByUrl('/menu/main')
    this.presentPopover();
  }
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPurchasePage, 
      translucent: true
    });
    return await popover.present();
  } 
}
