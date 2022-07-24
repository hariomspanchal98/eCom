import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  tempToken;
  products;
  i=0;

  constructor(private service:HttpService) { }

  ngOnInit(): void {
    this.tempToken = (localStorage.getItem('token'));
    // console.log("token is",this.tempToken);
    // this.service.get("auth/self",this.tempToken)
    // this.service.getProfileData(this.tempToken)
    this.service.secureGet('products',this.tempToken).subscribe((res:any)=>{
      console.log(res);
      // let output = JSON.parse(res)
      this.products = res;
      // console.log('profile data from service:- ',this.profileData);
      // console.table(this.products?.results)
    },
    (error) => {
      console.log('Error in login is: ', error)
      // this.clear();
      // this.registerForm.markAsPristine();
    },
    );
  }

}
