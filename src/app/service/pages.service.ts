import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface User { 
  ID?:string,
  email: string,
  id: string,
  members:string,
  plan:string,
  userid:string
}


@Injectable({
  providedIn: 'root'
})

export class PagesService {
  private pages = [];
  
  private users:Observable<User[]>;
  private userCollection:AngularFirestoreCollection<User>; 

  constructor(private afs:AngularFirestore) {
    this.pages = [
      {
        title: 'Home',
        url: '/menu/main',
        icon: 'home'
      },
      {
        title: 'Claims',
        url: '/menu/list',
        icon: 'bookmarks',
      },
      {
        title: 'Apply',
        url: '/menu/apply',
        icon: 'cart',
      },
      {
        title: 'Contact us',
        url: '/menu/contact',
        icon: 'call',
      },
      {
        title: 'Help',
        url: '/menu/help',
        icon: 'help',
      }, 
    ];
    this.userCollection = this.afs.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const ID = a.payload.doc.id;
          return{ID,...data };
        });
      })
    );
   }
   getPages(){
     return this.pages;
   }
   getUsers():Observable<User[]> {
    return this.users;
  }
}
