import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';
import { updateCart } from '../../state/cart.action';
import { getCartData } from '../../state/cart.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  tempToken: string;
  myForm: any;
  addressForm: any;
  profileData: any;
  profilePhotoUrl: any;
  loginFlag: boolean = false;
  registerFlag: boolean = false;
  addressFlag: boolean = false;
  addSelectedFlag: boolean = false;
  addNewAddress: boolean = false;
  editAdd: boolean = false;
  paymentStatus: boolean = false;
  editAddress: any = [];
  recaptcha: any;
  errorMsg: any;
  errorStatus: any;
  total: any = 0;
  cart: any = [];
  addressArray: any = [];
  orderForm: any;
  selectedAdd: any;
  tempAddId: any;
  itemForm: any;
  items: any = [];
  deliveryFee: any = 0;
  orderAddress: any = {
    city: '',
    state: '',
    addressLine2: '',
    pin: '',
    street: '',
  };
  cardForm: any;
  orderConfirm: boolean = false;

  constructor(public service: HttpService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private store: Store) { }

  ngOnInit(): void {
    this.executeImportantAction();

    if (this.service.cart) {
      this.getCartData();
      if (this.cart.length == 0)
        this.router.navigateByUrl(`products/all-products`);
      // if (!!localStorage.getItem('cart')) {
      //   this.getCartData();
      //   console.log(this.cart);
      // }
      // else {
      //   this.router.navigateByUrl(`products/all-products`);
      // }
    }
    else {
      this.cart = JSON.parse(localStorage.getItem('buyNow'));
      console.log(this.cart);
    }


    // console.log('creATING ORDER FORM', this.cart);

    this.addItems();

    // this.cart = JSON.parse(localStorage.getItem('cart'));
    // console.log(this.cart);

    for (let i = 0; i < this.cart.length; i++) {
      this.total += this.cart[i].price * this.cart[i].count;
    }

    this.service.orderValue = this.total;

    if (this.total < 999) {
      this.deliveryFee = 99;
      this.service.orderValue = this.total + this.deliveryFee;
    }

    if (!!localStorage.getItem('customerToken')) {
      // console.log(!!localStorage.getItem('customerToken'));
      // this.router.navigateByUrl('/seller/user/profile');
      this.tempToken = localStorage.getItem('customerToken');

      this.service.secureGet('shop/auth/self', this.tempToken).subscribe(
        (res: any) => {
          this.profileData = res;
          this.profilePhotoUrl = this.profileData?.picture;
          // console.log(res);
          // console.log(this.profileData);
        },
        (error) => {
          console.log(error.error.message);
        }
      );
    }


    this.orderForm = new FormGroup({
      items: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      deliveryFee: new FormControl(this.deliveryFee, [Validators.required]),
      total: new FormControl(this.total, [Validators.required]),
    })

    // this.orderForm.patchValue({})


  }
  //   this.store.dispatch(updateCart({ items: this.cart }));
  // this.getCartData();

  getCartData() {
    this.store.select(getCartData).subscribe((data) => {
      // this.cartProducts = data ? [...data] : [];
      // console.log(data);
      let temp = JSON.parse(JSON.stringify(data));
      this.cart = data ? [...temp] : [];
      // console.log('from store', this.cart);
      this.service.cartNo = this.cart.length;
      // console.log(this.cart[0]?.count);
    });
  }

  loginClick() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),

    })

    this.myForm.patchValue({
      captcha: this.recaptcha,
    });

    this.loginFlag = true;
    this.registerFlag = false;

  }

  login() {
    this.service.post('shop/auth/login', this.myForm.value).subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.profileData = data.customer;
        console.log('LogIn succes');
        localStorage.setItem('customerToken', data.token);
        this.loginFlag = false;
        this.registerFlag = false;
      },
      error: (error: any) => {
        console.log('Erroytyhfd', error.error.message);
        this.errorMsg = error.error.message;
        this.errorStatus = error.code;
        this.executeImportantAction();
      }
    })
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => { this.recaptcha = token }
      );
  }

  registerClick() {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),
      addresses: new FormControl('', [Validators.required])

    });

    this.addressForm = new FormGroup({
      street: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6}")]),
    }),

      this.myForm.patchValue({
        captcha: this.recaptcha,
      });

    this.loginFlag = false;
    this.registerFlag = true;
  }

  register() {
    this.myForm.patchValue({
      addresses: this.addressForm.value,
    })
    console.log(this.myForm.value);

    this.service.post('shop/auth/register', this.myForm.value).subscribe({
      next: (data: any) => {
        console.log('Created Succesfully');
        this.profileData = data.customer;
        localStorage.setItem('customerToken', data.token)
        console.log(data);
        this.loginFlag = false;
        this.registerFlag = false;
      },
      error: (error) => {
        this.errorMsg = error.error.message;
        this.executeImportantAction();
      },
    });
  }

  reset() {
    this.loginFlag = false;
    this.registerFlag = false;
  }

  createItem() {
    this.itemForm = new FormControl({
      productId: '',
      name: '',
      price: '',
      qty: '',
      subTotal: '',
    });
  }

  addItems() {
    for (let i = 0; i < this.cart.length; i++) {
      this.createItem();
      this.itemForm.patchValue({
        productId: this.cart[i]._id,
        name: this.cart[i].name,
        price: this.cart[i].price,
        qty: this.cart[i].count,
        subTotal: this.cart[i].price * this.cart[i].count,
      })
      this.items.push(this.itemForm.value);
      // console.log(this.itemForm.value);
    }

    // console.log(this.items);

    // this.orderForm.patchValue({
    //   items: this.items,
    // })

    // console.log(this.orderForm);
  }

  address() {

    this.tempToken = localStorage.getItem('customerToken');

    // this.orderForm.patchValue({
    //   items: this.cart,
    // });

    this.orderForm.patchValue({
      items: this.items,
    })

    console.log(this.orderForm.value);

    this.addressFlag = true;
    this.service.secureGet('customers/address', this.tempToken).subscribe(
      (res: any) => {
        console.log(res);
        this.addressArray = res;

        this.editAddress = [];
        for (let i = 0; i < this.addressArray.length; i++) {
          this.editAddress.push(false);
        }
        console.log(this.editAddress);
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
  }

  back1() {
    this.addressFlag = false;
    this.orderForm.controls['address'].reset();
  }

  addNewAdd() {
    this.addNewAddress = true;

    this.addressForm = new FormGroup({
      street: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6}")]),
    })
  }

  selectEditAdd(i) {
    this.editAddress[i] = true;
    for (let j = 0; j < this.editAddress.length; j++) {
      if (i != j)
        this.editAddress[j] = false;
    }
    this.addNewAddress = false;
  }

  edit(i) {
    this.editAdd = true;
    this.addNewAdd();
    this.addNewAddress = false;

    this.addressForm.patchValue({
      street: this.addressArray[i].street,
      addressLine2: this.addressArray[i].addressLine2,
      city: this.addressArray[i].city,
      state: this.addressArray[i].state,
      pin: this.addressArray[i].pin,
    })

    this.tempAddId = this.addressArray[i]._id;

    console.log(this.addressForm.value);
  }

  updateAdd() {
    this.service
      .securePut(
        'customers/address/' + this.tempAddId,
        this.tempToken,
        this.addressForm.value
      )
      .subscribe(
        () => {
          console.log('updated');
          this.tempAddId = '';
          this.address();
          this.editAdd = false;
        },
        (error) => {
          console.log('Error in update is: ', error);
        }
      );
  }

  cancelUpdate() {
    this.editAdd = false;
  }

  cancelAddAdd() {
    this.addNewAddress = false;
  }

  cancelSelectedAdd() {
    this.editAdd = false;
    this.addNewAddress = false;
    this.addressFlag = true;
    this.addSelectedFlag = false;
    console.log(this.orderForm.value);
  }

  addAdd() {
    this.service
      .securePost('customers/address', this.tempToken, this.addressForm.value)
      .subscribe({
        next: (data: any) => {
          console.log('Created Succesfully');
          console.log(data?._id);
          this.orderAddress.street = data?.street;
          this.orderAddress.addressLine2 = data?.addressLine2;
          this.orderAddress.state = data?.state;
          this.orderAddress.pin = data?.pin;
          this.orderAddress.city = data?.city;
          this.orderForm.patchValue({
            address: this.orderAddress,
          });
          this.addNewAddress = false;
          this.address();
        },
        error: (error) => {
          error.error.message;
        },
      });
  }

  afterAddress() {
    this.addressFlag = false;
    console.log(this.orderForm.value);
    this.service.secureGet('customers/address/' + this.orderForm.value.address, this.tempToken).subscribe(
      (res: any) => {
        console.log(res);
        this.selectedAdd = res;
        this.orderAddress.street = res?.street;
        this.orderAddress.addressLine2 = res?.addressLine2;
        this.orderAddress.state = res?.state;
        this.orderAddress.pin = res?.pin;
        this.orderAddress.city = res?.city;
        this.orderForm.patchValue({
          address: this.orderAddress,
        });
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
    this.addSelectedFlag = true;
  }

  sendOrder() {
    this.service
      .securePost('shop/orders', this.tempToken, this.orderForm.value)
      .subscribe({
        next: (data: any) => {
          console.log('Order Created');
          console.log(data, 'next');
          this.service.orderId = data.order?._id;
          console.log(this.service.orderId);
          this.orderConfirm = true;
        },
        error: (error) => {
          error.error.message;
          console.log(error);
        },
      });

    Swal.fire({
      title: 'Order Created Successfully.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Make Payment'
    }).then((result) => {
      if (result.isConfirmed) {
        // localStorage.removeItem('cart');
        this.cart=[];
        this.store.dispatch(updateCart({ items: this.cart }));
        this.router.navigateByUrl(`products/checkout/payment`);
      }
      else {
        // localStorage.removeItem('cart');
        this.cart=[];
        this.store.dispatch(updateCart({ items: this.cart }));
        this.router.navigateByUrl(`products/all-products`);
      }
    })
  }



  check() {
    return !!localStorage.getItem('customerToken');
  }
}
