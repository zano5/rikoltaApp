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
  button1:string="Apply";

  constructor(public toastController: ToastController,public actionSheetController: ActionSheetController,public loadingController: LoadingController,public alertController: AlertController,private route: Router ) {

// var uid = firebase.auth().currentUser.uid

  }


  ngOnInit() {

    
  }
ionViewDidEnter()
{
  console.log("Entered")
  firebase.firestore().collection("Approved Purchases").where("data.BuyerUserID","==","13uvM2yc90PcQFIdEcolt0bjs772").get().then(res=>{
    
    console.log(res)

    if(res.empty)
    {

    }
    else{
      console.log("false")

      this.button1="Policy"


      res.forEach(val=>{

      
   
        this.userplan=val.data()
        console.log(this.userplan)
        console.log(val.data().BuyerUserID)
  
        if(val.data().BuyerUserID==firebase.auth().currentUser.uid)
        {
         
          this.userplan=val.data()
     
        }
      })
    }



  })

}



async toClaims(){
 

  const loading = await this.loadingController.create({
    duration: 4000,
    spinner:"bubbles",
    message:"Please Wait..."
     });
     await loading.present();
   
     const { role, data } = await loading.onDidDismiss();

  firebase.firestore().collection("Approved Purchases").where("data.BuyerUserID","==",firebase.auth().currentUser.uid).get().then(async res=>{
    console.log(res.empty)

    if(res.empty)
    {
      const alert = await this.alertController.create({
        message: 'You don\'t have a funeral plan yet. You need to apply for a plan and wait for its approval.',
       buttons: ['OK']
     });
   
     await alert.present();
    }  
    
  
    res.forEach(async val=>{
      
    console.log(val.data())
     
       if(val.data().data.BuyerUserID==firebase.auth().currentUser.uid)
    {
      this.route.navigateByUrl('menu/list');
    
   }
     
  else{
   
 
console.log("else")

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
       
     }
     else{
firebase.firestore().collection("Approved Purchases").where("data.BuyerUserID","==",firebase.auth().currentUser.uid).get().then(async res=>{
console.log(res.empty)

if(!res.empty)
{

  console.log(this.userplan.data)
  console.log(this.userplan.data.BuyerFullName)
  console.log(this.userplan.data.BuyerPolicy)
  console.log(this.userplan.data.BuyerAddress.addresscity)
  console.log(this.userplan.data.BuyerMembers)
  console.log(this.userplan.id)

  const alert = await this.alertController.create({
    message: 'PolicyHolder:'+this.userplan.data.BuyerFullName+'\n Policy Type:'+this.userplan.data.BuyerPolicy+'\n '+'Number of Members:'+this.userplan.data.BuyerMembers.length,
   buttons: ['OK']
 });

 await alert.present();
}
 
else{


  firebase.firestore().collection("Purchases").where("BuyerUserID","==",firebase.auth().currentUser.uid).get().then(async res=>{
if(res.empty)
{
  const alert = await this.alertController.create({
    message: 'You don\'t have a funeral plan yet. Your application is still being processed.',
   buttons: ['OK']
 });

 await alert.present();
}
else
{
  this.route.navigateByUrl('menu/main');
}
  })


// res.forEach(async val=>{
    
//   console.log(val.data())
   
  

// })
}  


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
