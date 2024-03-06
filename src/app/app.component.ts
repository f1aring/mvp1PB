import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator';
import { Title } from '@angular/platform-browser';
import { FileUploadService } from './services/file-upload.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  photo!:File;
  nidPhoto!:File;
  files:string[] = [];

  constructor(private title:Title, private http:HttpClient,private fileUploadService: FileUploadService) {}

  AOF = new FormGroup({
    product: new FormControl('Savings Account',Validators.required),
    firstName: new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
    lastName: new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
    profession: new FormControl(null,Validators.required),
    mobile: new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    nid: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    tin: new FormControl('',Validators.required),
    branch: new FormControl('',Validators.required),
    photo: new FormControl(''),
    nidPhoto: new FormControl('')
   })
  ngOnInit(){
    this.setTitle("Prime Bank");
  }
  onSubmit(){
    const {product,firstName,lastName,profession,mobile,email,nid,tin,branch,photo,nidPhoto} = this.AOF.value;
    console.log(product,firstName,lastName,profession,mobile,email,nid,tin,branch,photo,nidPhoto);

    // const formData = new FormData();
    // formData.append('file',this.image);
    // this.http.post<any>('http://localhost:3000/file',formData).subscribe(res =>{
    //   console.log(res);  
    // },err =>{
    //   console.log(err);
    // })
    if (photo !== undefined && photo !== null) {
      this.files.push(photo);
    }
    if (nidPhoto !== undefined && nidPhoto !== null) {
      this.files.push(nidPhoto);
    }

    this.fileUploadService.uploadFile(this.files).subscribe(
      response => {
        console.log('File uploaded successfully', response);
      },
      error => {
        console.error('Error uploading file', error);
      }
    );
    this.AOF.reset();
  }

  photoSelected(event:any){
    const file: File = event.target.files[0];
    console.log(file);
    // this.files.push(file);
  }
  nidSelected(event: any): void {
    const file: File = event.target.files[0];
    console.log(file);
    // this.files.push(file);

  }

  setTitle(newTitle:string){
    this.title.setTitle(newTitle);
  }

  get mobile (){
    return this.AOF.controls.mobile;
  }
}
