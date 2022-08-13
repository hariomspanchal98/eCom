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
    private recaptchaV3Service: ReCaptchaV3Service,
    ) {}

  ngOnInit(): void {
    this.executeImportantAction();

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      addresses: new FormGroup({
        street: new FormControl('',[Validators.required]),
        addressLine2: new FormControl('',[Validators.required]),
        city: new FormControl('',[Validators.required]),
        state: new FormControl('',[Validators.required]),
        pin: new FormControl('',[Validators.required, Validators.pattern("[0-9]{6}")]),
      }),
      captcha: new FormControl('',[Validators.required]),
    });


  }

  get name() {
    return this.myForm.get('name');
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get street() {
    return this.myForm.addresses.get('street');
  }

  get addressLine2() {
    return this.myForm.addresses.get('addressLine2');
  }

  get city() {
    return this.myForm.addresses.get('city');
  }

  get pin() {
    return this.myForm.addresses.get('pin');
  }

  get state() {
    return this.myForm.addresses.get('state');
  }

  submit() {
    console.log(this.myForm.value);

    this.service.post('shop/auth/register', this.myForm.value).subscribe({
      next: (data: any) => {
        console.log('Created Succesfully');
        localStorage.setItem('customerToken', data.token)
        console.log(data);
        this.reset();
        this.router.navigateByUrl('/account/profile');
      },
      error: (error) => {
        this.errorMsg = error.error.message;
        this.executeImportantAction();
      },
    });
  }

  reset()
  {
    this.myForm.reset();
    this.executeImportantAction();
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) =>
        {this.recaptcha=token
        // console.log(this.recaptcha)
        this.myForm.patchValue({
          captcha : this.recaptcha,
        });
        }
        );
      // console.log(this.recaptcha);
  }
}
