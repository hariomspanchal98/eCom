import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http/http.service';
import { updateCart } from '../../state/cart.action';
import { getCartData } from '../../state/cart.selector';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tempToken;
  cartAdd = false;
  products;
  x=false;
  i = 0;
  index: number = this.service.pageNo;
  size: number;
  lengthy: any;
  pageSize: any = this.service.limitNo;
  sub: any;
  searchTerm: '';
  cart: any = [];
  localStorageValue: any;

  constructor(private service: HttpService, private router: Router,private store:Store) {}

  ngOnInit(): void {
    this.tempToken = localStorage.getItem('token');
    
    this.getData(this.service.pageNo, this.service.limitNo);

    this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    if (this.localStorageValue == null) {
      // console.log('if1 pre');
      this.cart = [];
      // console.log('if1 post');
    } else {
      // console.log('else1 pre');
      this.cart = this.localStorageValue;
      // console.log('else1 post');
    }
    this.service.cartNo = this.cart.length;
    this.getCartData(); 
  }

  getData(index, size) {
    this.index = index;
    this.size = size;
    this.service
      .secureGet(
        `shop/products?limit=${this.size}&page=${this.index}`,
        this.tempToken
      )
      .subscribe((data) => {
        // console.log(data);
        this.products = data;

        for (let i = 0; i < this.products.results.length; i++) {
          for (let j = 0; j < this.cart.length; j++) {
            if (this.cart[j]._id == this.products.results[i]?._id) {
              this.products.results[i].cart = true;
              break;
            } else this.products.results[i].cart = false;
          }
        }

        // console.log(this.products.results);

        this.sub = this.products.results;
        // console.log(this.users?.results);
        this.lengthy = this.products.totalResults;
        this.pageSize = this.products.limit;
      });
  }

  search(value: string): void {
    this.products.results = this.sub.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

  changeTable(e: PageEvent) {
    this.index = e.pageIndex + 1;
    this.size = e.pageSize;
    this.service
      .secureGet(
        'shop/products?page=' + this.index + '&limit=' + e.pageSize,
        this.tempToken
      )
      .subscribe((data) => {
        
        this.products = data;
        
        this.sub = this.products.results;
        
        this.service.pageNo = e.pageIndex + 1;
        this.service.limitNo = e.pageSize;
      });
  }

  addToCart(i:any) {

    // let flag = true;
    // let temp: any;
    // let count: any;
    // console.log(this.products.results[i]);

    // if (this.cart.length == 0) {
    //   // this.cart.push(this.products.results[i]);
    //   this.products.results[i].count = 1;
    //   this.products.results[i].cart = true;
    //   this.cart.push(this.products.results[i]);
    //   this.service.cartNo += 1;
    // }
    // else {
    //   for (let j = 0; j < this.cart.length; j++) {
    //     if (this.cart[j]._id == this.products.results[i]._id) {
    //       flag = false;
    //       temp = j;
    //       count = this.cart[j].count;
    //     }
    //   }

    //   if (flag) {
    //     this.cart.push(this.products.results[i]);
    //   }
    //   else {
    //     this.cart[temp].count = count + 1;
    //   }
    // }
    // this.store.dispatch(updateCart({ items: this.cart }));
    

    console.log(this.products.results[i]);
    let flag = false;
    let duplicate = false;
    // this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    
    if (this.cart.length == 0) {
      flag = true;
    }

    if (flag) {
      this.products.results[i].count = 1;
      this.products.results[i].cart = true;
      this.cart.push(this.products.results[i]);
      this.service.cartNo += 1;
    } else {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i]._id == this.products.results[i]._id) {
          // console.log('if pre');
          this.cart[i].count = this.cart[i].count + 1;
          // console.log('if post');
          duplicate = true;
          break;
        } else {
          duplicate = false;
        }
      }

      if (!duplicate) {
        // console.log('dup');
        this.products.results[i].count = 1;
        this.products.results[i].cart = true;
        this.cart.push(this.products.results[i]);
        // console.log('dup');
        // this.service.cartNo += 1;
      }

      flag = false;
    }

    // console.log(this.cart);
    // localStorage.setItem('cart', JSON.stringify(this.cart));
    this.store.dispatch(updateCart({ items: this.cart }));
  }

  getCartData() {
    this.store.select(getCartData).subscribe((data) => {
      // this.cartProducts = data ? [...data] : [];
      // console.log(data);
      let temp = JSON.parse(JSON.stringify(data));
      this.cart = data ? [...temp] : [];
      console.log('from store',this.cart);
      this.service.cartNo = this.cart.length;
      // console.log(this.cart[0]?.count);
    });
  }
}
