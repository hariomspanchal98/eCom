import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any =[];
  total:any=0;
  localStorageValue:any;

  constructor(private service: HttpService) { }

  ngOnInit(): void {
    this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    if (this.localStorageValue == null) {
      this.cart = [];
    } else {
      this.cart = this.localStorageValue;
    }

    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }

    console.log(this.cart);
  }

  check(){
    return !!(localStorage.getItem('token'));
  }

  clear(){
    localStorage.clear();
  }
  update(a, i){
    this.cart[i].count = this.cart[i].count + a;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.total=0;
    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }
  }
  crop(i){
    this.cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.total=0;
    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }
    this.service.cartNo -= 1;
  }
}
