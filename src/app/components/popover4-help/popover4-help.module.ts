import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Popover4HelpPage } from './popover4-help.page';

const routes: Routes = [
  {
    path: '',
    component: Popover4HelpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Popover4HelpPage]
})
export class Popover4HelpPageModule {}
