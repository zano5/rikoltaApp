import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular'; 
import { PopoverPurchasePage } from 'src/app/components/popover-purchase/popover-purchase.page';

@Component({
  selector: 'app-buyplan',
  templateUrl: './buyplan.page.html',
  styleUrls: ['./buyplan.page.scss'],
})
export class BuyplanPage implements OnInit {
  pricePlan:string;
  form:number;
  planMember = [];
  constructor(private activatedRoute:ActivatedRoute,private popoverController:PopoverController ) {
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
   }) 
  } 
  Next(){
    if (this.form < 2) {
      this.form += 1;
    }else{ 
      this.presentPopover();
    }
    
  
  } 
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPurchasePage, 
      translucent: true
    });
    return await popover.present();
  }
}
