import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cart: any = [];
  localStorageValue: any;
  cartNo: any;

  constructor(public service: HttpService, private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.localStorageValue = JSON.parse(localStorage.getItem('cart'));
    if (this.localStorageValue == null) {
      this.cart = [];
    } else {
      this.cart = this.localStorageValue;
    }
    // console.log(this.cart);
    this.cartNo = this.cart.length;
  }

  check() {
    return !!localStorage.getItem('customerToken');
  }

  clear() {
    // this.router.navigate(['account/profile']);
    // localStorage.clear();
    // this.router.navigateByUrl('account/profile');
this.authService.signOut().then(
      fulfilled=>{
        // console.log('Fulfilled');
      },
      rejected=>{
        // console.log('Rejected');
      },
    ).catch(
      (err)=>
      console.log('Error')
    ).finally(()=>
      {
        localStorage.clear();
        // setTimeout(() => {
          this.router.navigateByUrl('/login');
        // }, 500);
      }
    )
  }
}
