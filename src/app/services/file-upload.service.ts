import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) { }

  uploadFile(filePath: string, file: File): Observable<string> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return from(
        task.snapshotChanges().toPromise().then(() => fileRef.getDownloadURL().toPromise())
    );
  }
}
