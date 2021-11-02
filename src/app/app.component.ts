import { Component } from '@angular/core';
import {collection, collectionData, Firestore, CollectionReference} from '@angular/fire/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

type MyType = { title: string; };
type WithId<T> = T & { id: string; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fire-bug';

  constructor(private firestore: Firestore, private compatFirestore: AngularFirestore) {}

  a(): Observable<WithId<MyType>[]> {

    const coll = collection(this.firestore, 'test') as CollectionReference<MyType>;

    // not ok
    return collectionData(coll, {idField: 'id'});

  }

  b(): Observable<WithId<MyType>[]> {

    // ok
    return this.compatFirestore.collection<MyType>('test').valueChanges({idField: 'id'});

  }

}
