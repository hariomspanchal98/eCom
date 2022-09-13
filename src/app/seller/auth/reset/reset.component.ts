import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetPass: any;
  errorMsg: any;
  tempToken: any;
  reCaptcha: any;

  constructor(private route: ActivatedRoute, private service: HttpService, private recaptchaV3Service: ReCaptchaV3Service,private router:Router) { }

  ngOnInit(): void {
    this.executeImportantAction();

    this.route.queryParams.subscribe((params) => {
      // console.log(params); // { orderby: "price" }
      this.tempToken = params['token'];
    })

    this.resetPass = new FormGroup({
      password: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
      // captcha: new FormControl('', [Validators.required]),
    })

    this.executeImportantAction();
  }
  get password() {
    return this.resetPass.get('password');
  }

  submit() {
    
    this.resetPass.patchValue({
      token : this.tempToken,
      // captcha: this.reCaptcha,
    })

    console.log(this.resetPass.value.password);

    this.service.post(`auth/reset-password?token=${this.tempToken}`, {password : this.resetPass.value.password}).subscribe(
      (data:any) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      (error:any) => {
        console.log(error.error.message);
      }
    )
  }

  cancel() {
    this.resetPass.reset();
    this.router.navigateByUrl('seller/auth/login');
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => {
        this.reCaptcha = token
        // console.log(this.recaptcha)
        this.resetPass.patchValue({
          captcha : this.reCaptcha,
        })
      }
      );
  }

}
