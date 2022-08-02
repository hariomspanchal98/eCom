import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  newPhotos=[];
  photosArr=[];

  constructor(private service: HttpService, private http: HttpClient,
    private router:Router) {}

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
    for (let i = 0; i < event.target.files.length; i++) {
      const file: File = event.target.files[i];
      if (file) {
        this.newPhotos.push(file);
        // console.log(event.target.files);
        // this.fileName = file.name;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.photosArr.push(event.target.result);
          // this.imgFlag[1].push(false);
        };
      }
    }
    console.log('New photos:', this.newPhotos);
  }

  removeImg(i){
    this.newPhotos.splice(i, 1);
    this.photosArr.splice(i, 1);
  }


  submit() {
    // console.log(this.myForm.value);
    // console.log(this.selectedFile);
    // console.log(this.myForm.value.name);
    this.fd = new FormData();
    for (let i = 0; i < this.newPhotos.length; i++) {
      this.fd.append('images', this.newPhotos[i]);
    }
    // this.fd.append('images', this.selectedFile);
    this.fd.append('name', this.myForm.value.name);
    this.fd.append('description', this.myForm.value.description);


    // console.log(this.fd);

    console.log(this.myForm.value);
    this.service.securePost('products', this.tempToken, this.fd).subscribe(
      () => {
        console.log('added');
        this.router.navigateByUrl('/seller/products/allproducts');

      },
      (error: any) => {
        // console.log('Error in login is: ', error.message);
        this.errorMsg = error.message;
        // console.log(error);
        // this.registerForm.markAsPristine();
      }
    );


  }

}
