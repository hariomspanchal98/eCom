import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
})
export class UpdateproductComponent implements OnInit {
  tempToken: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private service: HttpService
  ) {}

  id: any;
  product: any;
  myForm: any;
  imageForm: any;
  publicId=[];
  errorMsg:any;

  ngOnInit(): void {
    this.tempToken = localStorage.getItem('token');

    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.myForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
    });

    // this.myForm = new FormGroup({
    //   name: new FormControl(this.product?.name),
    //   description: new FormControl(this.product?.description),
    // });

    this.service.get('products/' + this.id).subscribe((data: any) => {
      console.log(data);
      this.product = data;
      this.myForm.patchValue({
        name:this.product?.name,
        description:this.product.description
      });
      // console.log(this.myForm.value);
    });



    this.imageForm = new FormGroup({
      photos: new FormControl(''),
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get description() {
    return this.myForm.get('description');
  }

  get photos() {
    return this.imageForm.get('photos');
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files;
      // console.log(imageS);
      this.imageForm.controls['photos'].setValue(image);
    }
  }

  add() {
    const fd = new FormData();
    // console.log(this.product.images.length);
    // for(let i=0;i < this.product.images.length; i++){
    //   this.fd.append('images',this.product.images[i]);
    // }
    // console.log(this.imageForm.value.photos);

    for (let i = 0; i < this.publicId.length; i++) {
      fd.append('delete', this.publicId[i]);
    }

    for (let i = 0; i < this.imageForm.value.photos.length; i++) {
      fd.append('new_images', this.imageForm.value.photos[i]);
    }

    console.log('products/images/' + this.id);

    this.service
      .patch('products/images/' + this.id, fd, this.tempToken)
      .subscribe(
        (data: any) => {
          console.log('Added to link');
          this.product = data;
        },
        (error) => {
          console.log(error.error.message);
        }
      );

      this.imageForm.reset();
  }

  update() {
    this.add();
    if (this.myForm.name) {
      this.myForm.patchValue({
        name: this.product?.name,
      });
    }

    if (this.myForm.description) {
      this.myForm.patchValue({
        description: this.product?.description,
      });
    }

    console.log(this.myForm.value);

    this.service
      .patch('products/' + this.id, this.myForm.value, this.tempToken)
      .subscribe(
        (data: any) => {
          this.product= data;
          // console.log(data.token);
          // console.log(this.tokenId);
          // this.verifyMail = 'Check your email for verification link';
          // this.router.navigate(['/login']);
          this.router.navigateByUrl(
            `products/productdetails/${this.product._id}`
          );
        },
        (error) => {
          // console.log('Error in login is: ', error);
          // this.errorMsg = error.error.message;
          // this.registerForm.markAsPristine();
        }
      );
  }
  reset() {
    this.myForm.reset();
  }
  removeImage(i) {
    // this.product?.images.splice(i, 1);
    // console.log(this.product?.images[i].public_id);
      this.publicId.push(this.product.images[i].public_id);
      this.product?.images.splice(i, 1);
    // const fd = new FormData();
    // fd.append('delete', this.product?.images[i].public_id);
    // this.service
    //   .patch('products/images/' + this.id, fd, this.tempToken)
    //   .subscribe(
    //     (data: any) => {
    //       console.log(data);
    //       console.log('Deleted');
    //       this.product = data;
    //       // this.product?.images.splice(i, 1);
    //     },
    //     (error) => {
    //       console.log(error.error.message);
    //     }
    //   );
  }
}
