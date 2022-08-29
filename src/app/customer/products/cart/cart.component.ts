import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http/http.service';
import { updateCart } from '../../state/cart.action';
import { getCartData } from '../../state/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any =[];
  total:any=0;
  localStorageValue:any;

  constructor(private service: HttpService, private store:Store) { }

  ngOnInit(): void {
    this.service.cart = true;
    // this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    // if (this.localStorageValue == null) {
    //   this.cart = [];
    // } else {
    //   this.cart = this.localStorageValue;
    // }

    this.getCartData();

    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }

    // console.log(this.cart);
  }

  check(){
    return !!(localStorage.getItem('customerToken'));
  }

  clear(){
    localStorage.clear();
  }
  update(a, i){
    this.cart[i].count = this.cart[i].count + a;
    // localStorage.setItem('cart', JSON.stringify(this.cart));
    // this.cart = JSON.parse(localStorage.getItem('cart'));
    this.store.dispatch(updateCart({ items: this.cart }));
    this.getCartData();
    this.total=0;
    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }
  }
  crop(i){
    this.cart.splice(i,1);
    this.store.dispatch(updateCart({ items: this.cart }));
    this.getCartData();
    this.total=0;
    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }
    this.service.cartNo -= 1;
  }

  getCartData() {
    this.store.select(getCartData).subscribe((data) => {
      // this.cartProducts = data ? [...data] : [];
      // console.log(data);
      let temp = JSON.parse(JSON.stringify(data));
      this.cart = data ? [...temp] : [];
      // console.log('from store',this.cart);
      this.service.cartNo = this.cart.length;
      // console.log(this.cart[0]?.count);
    });
  }
}
