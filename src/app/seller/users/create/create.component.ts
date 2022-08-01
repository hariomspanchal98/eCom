import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  constructor(private router:Router,private service: HttpService) { }

  error;
  errorMsg;
  myForm:FormGroup;
  token:any;
  user:any;

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    // console.log(this.token);

    this.myForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required]),
    })

  }

  get name(){
    return this.myForm.get('name');
  }


  get role(){
    return this.myForm.get('role');
  }


  get email(){
    return this.myForm.get('email');
  }


  get password(){
    return this.myForm.get('password');
  }

  submit(){
    // console.log(this.myForm.value)


    this.service.securePost('users',this.token,this.myForm.value).subscribe(
      (data:any)=>{
      // console.log(data);
      this.user=data;
      console.log(this.user);
      console.log(this.user._id);
      // console.log(this.tokenId);
      // this.verifyMail = 'Check your email for verification link';
      // this.router.navigate(['/login']);
      // setTimeout(() => {
        this.router.navigateByUrl(`seller/users/details/${this.user._id}`);
      // }, 3000);
      // this.router.navigateByUrl('/users/details', this.user._id);

    },
    (error)=>{
      // console.log('Error in login is: ', error);
      this.errorMsg = error.message;
      // this.registerForm.markAsPristine();
    }
    )
      // this.register=false;
      // this.verify=true;
  }
}
