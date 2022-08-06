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
  register: boolean = true;
  verify: boolean = false;
  tokenId: string;
  recaptcha;

  constructor(
    private router: Router,
    private service: HttpService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.executeImportantAction();

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl('',[Validators.required]),
        addressLine2: new FormControl('',[Validators.required]),
        city: new FormControl('',[Validators.required]),
        state: new FormControl('',[Validators.required]),
        pin: new FormControl('',[Validators.required]),
      }),
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get company() {
    return this.myForm.get('company');
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get captcha() {
    return this.myForm.get('captcha');
  }

  submit() {
    // console.log(this.myForm.value)
    this.myForm.patchValue({
      captcha: this.recaptcha,
    });

    // console.log('recaptcha in submit....',this.recaptcha);

    // console.log(this.myForm.value);

    this.service.post('auth/register', this.myForm.value).subscribe({
      next: (data: any) => {
        // console.log(data.token);
        this.tokenId = data.token;
        // console.log(' print zala',this.tokenId, 'register madhe ');
        this.executeImportantAction();
        setTimeout(() => {
          this.service
            .securePost('auth/send-verification-email', this.tokenId, {
              captcha: this.recaptcha,
            })
            .subscribe(
              () => {
                console.log('email req sent');
              },
              (error: any) => {
                // console.log('Error in login is: ', error);
                this.errorMsg = error.error.message;
                this.executeImportantAction();
                // this.registerForm.markAsPristine();
              }
            );
        }, 2000);

        // this.verifyMail = 'Check your email for verification link';
        // this.router.navigate(['/login']);
        this.register = false;
        this.verify = true;
      },
      error: (error) => {
        // console.log('Error in login is: ', error);
        this.errorMsg = error.error.message;
        this.executeImportantAction();
        // this.registerForm.markAsPristine();
      },
    });
    this.register = false;
    this.verify = true;
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      // console.log(token);
      this.recaptcha = token;
      // console.log(this.recaptcha)
    });
  }
  // submit(){
  //   console.log(this.myForm.value)
  //   this.service.register(this.myForm.value).subscribe(
  //     (data:any)=>{
  //     // console.log(data);
  //     console.log('tegjfkhskuhhkgsuiehfkhsdekhc segedgg',data);
  //     // this.tokenId=data.token;
  //     // console.log(this.tokenId);
  //     // this.service.verification(this.tokenId);
  //     // this.router.navigateByUrl('/login');
  // },
  // (error:any)=>
  //     {
  //       // console.log('Erroytyhfd', error);
  //       this.errorMsg= error;
  //     }
  //   );
  //   // this.service.login(this.myForm.value).subscribe(
  //   //   (data:any)=>{
  //   //   // console.log(data);
  //   //   // localStorage.setItem('profileData', JSON.stringify(data));
  //   //   // localStorage.setItem('tokenId',JSON.stringify(data.token))
  //   //   this.tokenId=(data.token)
  //   //   ;})
  //   // console.log(this.tokenId);
  //   this.register=false;
  //   this.verify=true;
  //   }
}
