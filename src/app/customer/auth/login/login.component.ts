import { SocialUser, SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  myForm :any;
  error;
  errorMsg;
  errorStatus;
  user: SocialUser;
  loggedIn: boolean;
  recaptcha;

  constructor(
    private router:Router,
    private service: HttpService,
    private authService: SocialAuthService,
    private recaptchaV3Service: ReCaptchaV3Service,
    ) { }

  ngOnInit(): void {

    if(!!(localStorage.getItem('token'))){
      console.log(!!(localStorage.getItem('token')));
      // this.router.navigateByUrl('/seller/user/profile');
      this.router.navigate(['user/profile']);
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    })

    this.myForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    })
  }

  get email(){
    return this.myForm.get('email');
  }


  get password(){
    return this.myForm.get('password');
  }


  login(){
    this.service.post('auth/login?captcha=false', this.myForm.value).subscribe({
      next: (data:any)=>{
      localStorage.setItem('token',data.token);
      console.log('LogIn dkjsfhsiudghfo');
      this.router.navigateByUrl('/seller/user/profile');
      },
      error: (error:any)=>
      {
        console.log('Erroytyhfd', error.error.message);
        this.errorMsg= error.error.message;
        this.errorStatus=error.code;
      }
    })
  }
}

