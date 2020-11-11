import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-newhome',
  templateUrl: './newhome.page.html',
  styleUrls: ['./newhome.page.scss'],
})
export class NewhomePage implements OnInit {

  userplan:any ={}

  constructor(public toastController: ToastController,public actionSheetController: ActionSheetController,public loadingController: LoadingController,public alertController: AlertController,private route: Router ) {

// var uid = firebase.auth().currentUser.uid

  }


  ngOnInit() {

    
  }
ionViewDidEnter()
{
  console.log("Entered")
  firebase.firestore().collection("Purchase").get().then(res=>{
    
    console.log(res)

    res.forEach(val=>{

      
   
      this.userplan=val.data()
      console.log(this.userplan)
      console.log(val.data().BuyerUserID)

      if(val.data().BuyerUserID==firebase.auth().currentUser.uid)
      {
        this.checkplan()
        this.userplan=val.data()
   
      }
    })

  })

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


async toClaims(){
 

  const loading = await this.loadingController.create({
    duration: 5000,
    spinner:"bubbles",
    message:"Please Wait..."
     });
     await loading.present();
   
     const { role, data } = await loading.onDidDismiss();

  firebase.firestore().collection("Approved Purchases").get().then(res=>{
  
    res.forEach(async val=>{
      
    console.log(val.data())
     
       if(val.data().data.BuyerUserID==firebase.auth().currentUser.uid)
    {
      this.route.navigateByUrl('menu/list');
    
   }
     
  else{
   
 


    const alert = await this.alertController.create({
      message: 'You don\'t have a funeral plan yet. You need to apply for a plan and wait for its approval.',
     buttons: ['OK']
   });
 
   await alert.present();
  }  
  
  })
  })




}
async toApply(){
  console.log("Apply")

  console.log(this.userplan.BuyerUserID==firebase.auth().currentUser.uid)

  
  const loading = await this.loadingController.create({
    duration: 5000,
    spinner:"bubbles",
    message:"Please Wait..."
     });
     await loading.present();
   
     const { role, data } = await loading.onDidDismiss();
     if((this.userplan.BuyerUserID==firebase.auth().currentUser.uid))
     {
       this.checkplan()
     }
     else{
firebase.firestore().collection("Approved Purchases").get().then(res=>{
  console.log(res.empty)
if(res.empty)
{
  this.route.navigateByUrl('menu/main');
}


  res.forEach(async val=>{
    
  console.log(val.data())
   
     if(val.data().data.BuyerUserID==firebase.auth().currentUser.uid)
  {

    const alert = await this.alertController.create({
      message: 'You already have a funeral plan.',
     buttons: ['OK']
   });
 
   await alert.present();
 }
   
else{
 
  this.route.navigateByUrl('menu/main');
}  

})
})
}
 
}
toContact(){
  this.route.navigateByUrl('menu/contact');
}
toHelp(){
  this.route.navigateByUrl('menu/help');
}


async presentLoading() {
  const loading = await this.loadingController.create({
 duration: 5000,
 spinner:"bubbles",
 message:"Please Wait..."
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
}



async presentActionSheet() {
 
  const toast = await this.toastController.create({
  
    message: 'Sign out?',
    position: 'top',
    color:"primary",
    buttons: [
      {
        side: 'end',
        icon: 'log-out',
        text: 'Yes',
        
        handler: () => {
          firebase.auth().signOut()
          this.route.navigateByUrl('signin')
        }
      }, {
        text: 'No',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');

      }}
    ]
  });
  toast.present();

}


}
