import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,DocumentReference} from '@angular/fire/firestore';
import{Observable} from 'rxjs';
import{map,take} from 'rxjs/operators';

export interface user {

    // Consider adding unique ID
    username : string,
    uid : string
    
}

@Injectable()
export class UserService{

    private user : user
    private utenti : Observable<user[]>;
    private collectionUtenti : AngularFirestoreCollection<user>

    constructor(private afstore : AngularFirestore) {

        this.collectionUtenti = this.afstore.collection<user>('utenti');
        this.utenti = this.collectionUtenti.snapshotChanges().pipe(
            map(actions =>{
                return actions.map(a =>{
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id,...data};
                });
            })     
        );
    }

    getUtenti(): Observable<user[]>{

        return this.utenti;
    }

    getUtente(id : string) : Observable<user>{

        return this.collectionUtenti.doc<user>(id).valueChanges().pipe(

            take(1),
            map(utente =>{
                utente.uid = id;
                return utente;
            })
        );
    }

    addUtente(utente : user) : Promise<DocumentReference>{

        return this.collectionUtenti.add(utente);

    }

    updateUtente(utente : user) : Promise<void>{

        return this.collectionUtenti.doc(utente.uid).update({ name : utente.username});
    }

    deleteUtente(id : string) : Promise<void>{

        return this.collectionUtenti.doc(id).delete();
    }

    setUser(user : user) {

        this.user = user;
    }

    getUID(){

        return this.user.uid;
    }
}