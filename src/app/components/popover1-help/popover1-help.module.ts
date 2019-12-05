import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Popover1HelpPage } from './popover1-help.page';

const routes: Routes = [
  {
    path: '',
    component: Popover1HelpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Popover1HelpPage]
})
export class Popover1HelpPageModule {}
