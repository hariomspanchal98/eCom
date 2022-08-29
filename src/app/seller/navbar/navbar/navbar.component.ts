import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private service: HttpService){}

  profileData :any;
  tempToken : string;

  ngOnInit(): void {
    this.tempToken = (localStorage.getItem('token'));
    // console.log("token is",this.tempToken);
    // this.service.get("auth/self",this.tempToken)
    // this.service.getProfileData(this.tempToken)
    this.service.secureGet('auth/self',this.tempToken).subscribe((res:any)=>{
      // console.log(res);
      // let output = JSON.parse(res)
      this.profileData = res;
      // console.log(this.profileData.role);
      // console.log('profile data from service:- ',this.profileData);
    })

  }

  clear(){
    localStorage.clear();
    // this.authService.signOut();
    this.router.navigateByUrl('/login');
  }

}
