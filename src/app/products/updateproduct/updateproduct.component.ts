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

  ngOnInit(): void {
    this.tempToken = localStorage.getItem('token');

    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.service.get('products/' + this.id).subscribe((data: any) => {
      console.log(data);
      this.product = data;
      // console.log(this.user);
    });

    this.myForm = new FormGroup({
      name: new FormControl(this.product?.name),
      description: new FormControl(this.product?.description),
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get description() {
    return this.myForm.get('description');
  }

  update() {
    this.service
      .patch('products/' + this.id, this.myForm.value, this.tempToken)
      .subscribe(
        (data: any) => {
          // console.log(data.token);
          // console.log(this.tokenId);
          // this.verifyMail = 'Check your email for verification link';
          // this.router.navigate(['/login']);
          this.router.navigateByUrl(`products/productdetails/${this.product._id}`);
        },
        (error) => {
          // console.log('Error in login is: ', error);
          // this.errorMsg = error.error.message;
          // this.registerForm.markAsPristine();
        }
      );
    // this.register=false;
    // this.verify=true;
  }
  reset() {
    this.myForm.reset();
  }
}
