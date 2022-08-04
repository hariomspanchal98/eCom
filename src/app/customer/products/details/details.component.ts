import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  tempToken:any;
  localStorageValue: any;
  cart: any=[];

  constructor(private _Activatedroute:ActivatedRoute,private router: Router, private service: HttpService) { }

  id:any;
  product:any;
  previewImgUrl;

  ngOnInit(): void {
    this.tempToken = (localStorage.getItem('token'));

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.service.get('products/'+this.id).subscribe((data:any)=>{
      console.log(data);
      this.product=data;
      this.previewImgUrl= this.product?.images[0].url;
      console.log(this.previewImgUrl);
      // console.log(this.user);
    })
  }
  remove(url: any) {
    // console.log(url);
    this.service.del('products/' + url, this.tempToken).subscribe(
      (data: any) => {
        // console.log(data);
        console.log('Deleted');
        this.router.navigateByUrl(`seller/products/allproducts`);
      },
      (error) => {
      }
    );
    // console.log('users/'+ (url));
  }

  sweetAlert(abc){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.remove(abc);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
      if (!(result.isConfirmed)) {
        Swal.fire(
          '2nd block executed  Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }

    })
  }

  addToCart(product) {
    console.log(product);
    let flag = false;
    let duplicate = false;
    this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    if (this.localStorageValue == null) {
      console.log('if1 pre');
      this.cart = [];
      flag = true;
      console.log('if1 post');
    } else {
      console.log('else1 pre');
      this.cart = this.localStorageValue;
      console.log('else1 post');
    }

    if (flag) {
      product.count = 1;
      this.cart.push(product);
    }
    else {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i]._id == product._id) {
          console.log('if pre');
          this.cart[i].count = this.cart[i].count + 1;
          console.log('if post');
          duplicate=true;
          break;
        }
        else {
          duplicate=false;
        }
      }

      if(!duplicate)
      {
        console.log('dup');
          product.count = 1;
          this.cart.push(product);
          console.log('dup');
      }

      flag = false;
    }

    console.log(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
