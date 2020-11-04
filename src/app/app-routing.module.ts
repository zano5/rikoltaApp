
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  // { path: 'modal', loadChildren: './pages/modal/modal.module#ModalPageModule' },
  { path: 'buyplan', loadChildren: './pages/buyplan/buyplan.module#BuyplanPageModule' },
  { path: 'popover-result', loadChildren: './components/popover-result/popover-result.module#PopoverResultPageModule' },
  { path: 'popover-purchase', loadChildren: './components/popover-purchase/popover-purchase.module#PopoverPurchasePageModule' },
  { path: 'popover1-help', loadChildren: './components/popover1-help/popover1-help.module#Popover1HelpPageModule' },
  { path: 'popover2-help', loadChildren: './components/popover2-help/popover2-help.module#Popover2HelpPageModule' },
  { path: 'popover3-help', loadChildren: './components/popover3-help/popover3-help.module#Popover3HelpPageModule' },
  { path: 'popover4-help', loadChildren: './components/popover4-help/popover4-help.module#Popover4HelpPageModule' },
  { path: 'newhome', loadChildren: './pages/newhome/newhome.module#NewhomePageModule' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
