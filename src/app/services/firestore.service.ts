import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentSnapshot, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, query, updateDoc, where } from '@angular/fire/firestore'
import {  Observable } from 'rxjs';

import { ScriptUiConfigStoreItem } from '../data-types';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore)
  private configCollection: CollectionReference;
  private authService: AuthService = inject(AuthService)


  constructor() {
    this.configCollection = collection(this.firestore, 'config-store')
  }

  getConfigStoreItems(authorUid : string): Observable<ScriptUiConfigStoreItem[]> {
    let storeCollection = query(this.configCollection, where('authorUid', '==', authorUid)) as CollectionReference
    return collectionData(storeCollection, {idField: 'id'}) as Observable<ScriptUiConfigStoreItem[]>
  }

  getConfigStoreItem(id: string) : Promise<DocumentSnapshot> {
    return getDoc(doc(this.configCollection, id))
  }

  addConfigStoreItem(data: any) {
    return addDoc(this.configCollection, data)
  }

  updateConfigStoreItem(id:string, data: any) {
    return updateDoc(doc(this.configCollection, id), data)
  }

  deleteConfigStoreItem(id: string) : Promise<any> {
      return deleteDoc(doc(this.configCollection, id))
  }
}
