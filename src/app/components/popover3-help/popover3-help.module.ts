import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Popover3HelpPage } from './popover3-help.page';

const routes: Routes = [
  {
    path: '',
    component: Popover3HelpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Popover3HelpPage]
})
export class Popover3HelpPageModule {}
