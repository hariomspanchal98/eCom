import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData :any;
  tempToken : string;

  constructor( private router : Router, private service: HttpService,private authService: SocialAuthService) { }

  ngOnInit(): void {
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

}
