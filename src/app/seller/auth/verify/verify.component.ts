import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  token: string;
  verifiedSuccesfully: boolean = false;
  errorMsg: any;

  constructor(private route: ActivatedRoute, private service: HttpService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // console.log(params); // { orderby: "price" }
      this.token = params['token'];
      // console.log(this.orderby); // price
      // verificatio Method
      this.service.post('auth/verify-email?token=' + this.token).subscribe({
        next: () => {
          // console.log("Verification Done...!"),
          this.verifiedSuccesfully = true;
        },
        error: (error) => {
          // console.log('Error in login is: ', error);
          this.errorMsg = error.message;
          // this.registerForm.markAsPristine();
        },
      });
      // this.verified=true;
    });
  }
}
