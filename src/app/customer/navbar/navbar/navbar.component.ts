import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cart:any=[];
  localStorageValue:any;
  cartNo:any;

  constructor(private service:HttpService) { }

  ngOnInit(): void {
    this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    if (this.localStorageValue == null) {
      this.cart = [];
    } else {
      this.cart = this.localStorageValue;
    }
    console.log(this.cart);
    this.cartNo = this.cart.length;
  }

  check(){
    return !!(localStorage.getItem('token'));
  }

  clear(){
    localStorage.clear();
  }
}
