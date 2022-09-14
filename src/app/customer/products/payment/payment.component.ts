import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardForm: any;
  tempToken: string;

  constructor(public service : HttpService, private router : Router ) { }

  ngOnInit(): void {
    console.log(this.service.orderId);
    this.tempToken = localStorage.getItem('customerToken');

    this.payment();
  }

  payment(){

    this.cardForm = new FormGroup({
      nameOnCard:new FormControl(''),
      cardNumber: new FormControl(''),
      expiry: new FormControl(''),
      cvv: new FormControl('')
    })

  }
  
  pay(){
    console.log(this.cardForm.value);
    this.service
      .securePut('shop/orders/confirm/'+this.service.orderId, this.tempToken, this.cardForm.value)
      .subscribe({
        next: (data: any) => {
          console.log('Payment Done');
          console.log(data,'next');
          this.successAlert();
        },
        error: (error) => {
          error.error.message;
          console.log(error.error.message);
          this.errorAlert(error.error.message);
        },
      });
  }


  successAlert(){
    Swal.fire({
      title: 'Payment Done Successfully...!',
      text: "Check your order in profile page.",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Go to profile',
      cancelButtonText: 'View all Products',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(`account/profile`);
      }
      else{
        this.router.navigateByUrl(`products/all-products`);
      }
    })
  }

  errorAlert(abc){
    Swal.fire({
      title: 'Payment unsuccessful',
      text: abc,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Retry',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(`products/checkout/payment`);
      }
      else{
        this.router.navigateByUrl(`products/checkout/payment`);
      }
    })
  }

}
