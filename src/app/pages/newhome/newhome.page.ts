import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newhome',
  templateUrl: './newhome.page.html',
  styleUrls: ['./newhome.page.scss'],
})
export class NewhomePage implements OnInit {

  userplan ={}
  constructor(public alertController: AlertController,private route: Router ) {

// var uid = firebase.auth().currentUser.uid

    firebase.firestore().collection("users").where("userid","==","13uvM2yc90PcQFIdEcolt0bjs772").get().then(res=>{
      res.forEach(val=>{

        
     
        this.userplan=val.data()
        console.log(this.userplan)

        if(val.data().plan =="none")
        {
          this.checkplan()
        }
      })
    })
  }


  ngOnInit() {

    
  }

  async checkplan()
{

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'You do not have a plan, would you like to browse plans?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.route.navigateByUrl('menu/main');
        }
      }
    ]
  });
var valu:boolean;
  firebase.firestore().collection('Purchase').where("BuyerEmail","==","fumanizondo@gmail.com").get().then(res=>{
    res.forEach(val=>{
      console.log(val.exists)
      valu =val.exists
    })
  })

  if(valu==true)
  {
await alert.present();
  }
  else{
    const alert = await this.alertController.create({
    header:"Notification",
      message: 'Your purchase is still under evaluation, please be patient.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // await alert.present();

}


toClaims(){
  this.route.navigateByUrl('menu/list');
}
toApply(){
  this.route.navigateByUrl('menu/main');
}
toContact(){
  this.route.navigateByUrl('menu/contact');
}
toHelp(){
  this.route.navigateByUrl('menu/help');
}


}
