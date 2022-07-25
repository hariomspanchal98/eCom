import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {
  myForm: any;
  tempToken;
  selectedFile:File;
  errorMsg;

  constructor(private service: HttpService, private http: HttpClient) {}

  ngOnInit(): void {
    this.tempToken = localStorage.getItem('token');

    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      images: new FormControl(''),
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get images() {
    return this.myForm.get('images');
  }

  get description() {
    return this.myForm.get('description');
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  submit() {
    // console.log(this.myForm.value);
    console.log(this.myForm.value.name);
    const fd = new FormData();
    fd.append('name', this.myForm.value.name);
    fd.append('description', this.myForm.value.description);
    fd.append('images', this.selectedFile, this.selectedFile.name);
    // this.fd.append('name', this.myForm.value.name);
    // this.fd.append('description', this.myForm.value.description);


    console.log(fd);

    console.log(this.myForm.value);
    this.service.securePost('products', this.tempToken, fd).subscribe(
      () => {
        console.log('added');
      },
      (error: any) => {
        console.log('Error in login is: ', error.message);
        this.errorMsg = error.message;
        // console.log(error);
        // this.registerForm.markAsPristine();
      }
    );
  }
}
