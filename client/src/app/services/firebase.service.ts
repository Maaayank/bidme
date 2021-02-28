import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


    constructor(private _store: AngularFireStorage ) { }

    uploadFile( path: string, file: File){
        
        return new Promise<any>( (resolve, reject)=> {
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