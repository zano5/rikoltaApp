import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buyPlan(pricePlan:any){ 
    console.log(pricePlan);
    this.router.navigate(["/buyplan",{plan:pricePlan}]);

  }
  
}
