import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {


  email: string = "";
  password: string = "";
  message: string;

  constructor(private fb: FormBuilder, private route: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  logIn(){
    try{
      if(this.email == "email" && this.password == "pwd"){
        this.route.navigateByUrl("menu")
      }
      else{
        this.message = "Incorrect credentials";
        this.presentAlert();
      }

    }
    catch(error){
      console.error(error);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: 'Incorrect Credentials',
      buttons: ['OK']
    });

    await alert.present();
  }


}
