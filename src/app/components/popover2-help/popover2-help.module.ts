import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Popover2HelpPage } from './popover2-help.page';

const routes: Routes = [
  {
    path: '',
    component: Popover2HelpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Popover2HelpPage]
})
export class Popover2HelpPageModule {}
