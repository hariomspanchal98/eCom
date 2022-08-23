import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpService } from 'src/app/services/http/http.service';

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
  addressFlag:boolean = false;
  addSelectedFlag:boolean = false;
  addNewAddress:boolean = false;
  editAdd:boolean = false;
  editAddress:any = [];
  recaptcha: any;
  errorMsg: any;
  errorStatus: any;
  total:any = 0;
  cart:any = [];
  addressArray:any =[];
  checkoutForm:any;
  selectedAdd:any;
  tempAddId:any;

  constructor(public service: HttpService, private router: Router, private authService: SocialAuthService, private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
    this.executeImportantAction();

    if(this.service.cart){
      this.cart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.cart);
    }
    else
    {
      this.cart = JSON.parse(localStorage.getItem('buyNow'));
      console.log(this.cart);
    }

    // this.cart = JSON.parse(localStorage.getItem('cart'));
    // console.log(this.cart);

    for(let i=0;i<this.cart.length; i++)
    {
      this.total += this.cart[i].price * this.cart[i].count;
    }

    if (!!localStorage.getItem('customerToken')) {
      console.log(!!localStorage.getItem('customerToken'));
      // this.router.navigateByUrl('/seller/user/profile');
      this.tempToken = localStorage.getItem('customerToken');

      this.service.secureGet('shop/auth/self', this.tempToken).subscribe(
        (res: any) => {
          this.profileData = res;
          this.profilePhotoUrl = this.profileData?.picture;
          console.log(res);
          // console.log(this.profileData);
        },
        (error) => {
          console.log(error.error.message);
        }
      );
    }

    this.checkoutForm = new FormGroup({
      cart: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    })

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

  address(){

    this.tempToken = localStorage.getItem('customerToken');

    this.checkoutForm.patchValue({
      cart: this.cart,
    });

    console.log(this.checkoutForm.value);

    this.addressFlag = true;
    this.service.secureGet('customers/address', this.tempToken).subscribe(
      (res: any) => {
        console.log(res);
        this.addressArray = res;

        this.editAddress=[];
        for(let i=0; i<this.addressArray.length; i++){
          this.editAddress.push(false);
        }
        console.log(this.editAddress);
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
  }

  back1(){
    this.addressFlag = false;
    this.checkoutForm.reset();
  }

  addNewAdd(){
    this.addNewAddress = true;

    this.addressForm = new FormGroup({
      street: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6}")]),
    })
  }

  selectEditAdd(i){
    this.editAddress[i] = true;
    for(let j=0; j<this.editAddress.length; j++){
      if(i!=j)
      this.editAddress[j] = false;
    }
    this.addNewAddress = false;
  }

  edit(i){
    this.editAdd = true;
    this.addNewAdd();
    this.addNewAddress = false;

    this.addressForm.patchValue({
      street : this.addressArray[i].street,
      addressLine2 : this.addressArray[i].addressLine2,
      city : this.addressArray[i].city,
      state : this.addressArray[i].state,
      pin : this.addressArray[i].pin,
    })

    this.tempAddId= this.addressArray[i]._id;

    console.log(this.addressForm.value);
  }

  updateAdd(){
    this.service
      .securePut(
        'customers/address/' + this.tempAddId,
        this.tempToken,
        this.addressForm.value
      )
      .subscribe(
        (data: any) => {
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

  cancelUpdate(){
    this.editAdd = false;
  }

  cancelAddAdd(){
    this.addNewAddress = false;
  }

  cancelSelectedAdd(){
    this.editAdd = false;
    this.addNewAddress = false;
    this.addressFlag = true;
    this.addSelectedFlag = false;
    this.checkoutForm.address.reset();
    console.log(this.checkoutForm.value);
  }

  addAdd(){
    this.service
      .securePost('customers/address', this.tempToken, this.addressForm.value)
      .subscribe({
        next: (data: any) => {
          console.log('Created Succesfully');
          console.log(data?._id);
          this.checkoutForm.patchValue({
            address: data?._id,
          });
          this.addNewAddress = false;
          this.address();
        },
        error: (error) => {
          error.error.message;
        },
      });
  }

  afterAddress(){
    this.addressFlag = false;
    console.log(this.checkoutForm.value);
    this.service.secureGet('customers/address/'+ this.checkoutForm.value.address, this.tempToken).subscribe(
      (res: any) => {
        console.log(res);
        this.selectedAdd = res;
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
    this.addSelectedFlag = true;
  }

  check() {
    return !!localStorage.getItem('customerToken');
  }
}
