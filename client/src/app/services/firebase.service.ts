import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { AngularFireAuth } from '@angular/fire/auth'
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


    constructor(private _store: AngularFireStorage , private _auth: AngularFireAuth) {

        _auth.authState.subscribe(auth => {
            console.log("USER AUTHENTICATED: " + auth.uid);
          })
     }

    authUser(token: any){
        console.log(token)
        this._auth.signInWithCustomToken(token).then(
            res => { console.log(`firebase auth complete : ${res}`)},
            err => { console.log(` error ${err}`)}
        )
    }


    uploadFile( path: string, file: File){

        return new Promise<any>( (resolve, reject)=> {
            this._auth.currentUser.then( (res)=> {
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
            const task: AngularFireUploadTask = this._store.upload(path, file)
            task.snapshotChanges().pipe(
                finalize(()=>{
                    this.getDownloadUrl(path).subscribe(
                        res => resolve(res),
                        err => reject(err)
                    )
                })
            ).subscribe()
        })
    }

    deleteFile( path: String){
        this._store.ref(String(path)).delete()
    }

    getDownloadUrl(path){
        return this._store.ref(path).getDownloadURL()
    }
}   