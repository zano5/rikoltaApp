import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buyplan',
  templateUrl: './buyplan.page.html',
  styleUrls: ['./buyplan.page.scss'],
})
export class BuyplanPage implements OnInit {
  pricePlan:string;
  form:number;
  planMember = [];
  constructor(private activatedRoute:ActivatedRoute) {
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
    this.form = 2;
  }
}
