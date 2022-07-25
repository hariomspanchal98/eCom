import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css'],
})
export class CreateproductComponent implements OnInit {
  myForm: any;
  tempToken;
  selectedFile;
  fd;
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
    this.selectedFile = event.target.files[0];

  }

  submit() {
    // console.log(this.myForm.value);
    console.log(this.selectedFile);
    console.log(this.myForm.value.name);
    this.fd = new FormData();
    this.fd.append('images', this.selectedFile);
    // this.fd.append('name', this.myForm.value.name);
    // this.fd.append('description', this.myForm.value.description);


    console.log(this.fd);

    console.log(this.myForm.value);
    this.service.securePost('products', this.tempToken, this.fd).subscribe(
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
