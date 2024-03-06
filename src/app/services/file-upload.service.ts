import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  uploadFile(files: string[]): Observable<any> {
    // const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    const formData: FormData = new FormData();

    console.log(files);

    console.log(formData);
    // formData.append('fileName', file.name);
    // formData.append('file', file);
    return this.http.post<any>('http://localhost:3000/file', formData).pipe(
      catchError(err => {
         return err;
      })
      );  
  }
}
