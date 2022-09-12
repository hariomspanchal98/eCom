import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData :any;
  tempToken : string;
  recaptcha: any;
  errorMsg:any;
  flag=true;

  constructor( private router : Router, private service: HttpService,private authService: SocialAuthService, private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
    this.executeImportantAction();
    this.tempToken = (localStorage.getItem('token'));
    // console.log("token is",this.tempToken);
    // this.service.get("auth/self",this.tempToken)
    // this.service.getProfileData(this.tempToken)
    this.service.secureGet('auth/self',this.tempToken).subscribe((res:any)=>{
      // console.log(res);
      // let output = JSON.parse(res)
      this.profileData = res;
      // console.log('profile data from service:- ',this.profileData);
    },
    (error) => {
      // console.log('Error in login is: ', error)
      this.clear();
      // this.registerForm.markAsPristine();
    },
    );
  }

  sendVerificationMail(){
    this.executeImportantAction();
    this.service.securePost('auth/send-verification-email',this.tempToken, { "captcha" : this.recaptcha } ).subscribe(
      ()=>{
        console.log('email req sent');
        this.flag = false;
      },
      (error:any)=>{
        // console.log('Error in login is: ', error);
        this.errorMsg = error.error.message;
        this.executeImportantAction();
        // this.registerForm.markAsPristine();
      }
    )
  }
  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => {
        // console.log(token);
        this.recaptcha= token;
        // console.log(this.recaptcha)
      });
  }

  clear(){
    // console.log('sjdkfhshdgi');
    // localStorage.clear();
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
    // window.location.reload();


  }

  updatePassword(){
    console.log('Update Clickd');
  }

}
