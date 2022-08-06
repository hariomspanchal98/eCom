import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myForm: any;
  error;
  errorMsg;
  tokenId: string;
  recaptcha;

  constructor(
    private router: Router,
    private service: HttpService,
    ) {}

  ngOnInit(): void {


    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl('',[Validators.required]),
        addressLine2: new FormControl('',[Validators.required]),
        city: new FormControl('',[Validators.required]),
        state: new FormControl('',[Validators.required]),
        pin: new FormControl('',[Validators.required, Validators.pattern("[0-9]{6}")]),
      }),
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get street() {
    return this.myForm.address.get('street');
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get addressLine2() {
    return this.myForm.address.get('addressLine2');
  }

  get city() {
    return this.myForm.address.get('city');
  }

  get pin() {
    return this.myForm.address.get('pin');
  }

  get state() {
    return this.myForm.address.get('state');
  }

  submit() {

    this.service.post('shop/auth/register?captcha=false', this.myForm.value).subscribe({
      next: (data: any) => {
        console.log('Created Succesfully');
        console.log(data);
        this.reset();
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      },
    });
  }

  reset()
  {
    this.myForm.reset();
  }
}
