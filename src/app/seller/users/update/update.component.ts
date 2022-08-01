import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  tempToken: string;
  id: any;
  user: any;

  constructor(private _Activatedroute:ActivatedRoute,private router: Router, private service: HttpService) { }

  error;
  errorMsg;
  myForm:FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(this.user?.name,[Validators.required]),
      email: new FormControl(this.user?.email,[Validators.required]),
      password:new FormControl('',[Validators.required]),
      // role:new FormControl(this.user.role,[Validators.required]),
    })



    this.tempToken = (localStorage.getItem('token'));

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.service.get('users/'+this.id).subscribe((data:any)=>{
      // console.log(data);
      this.user=data;
      console.log(this.user);
      // console.log(this.user.name);
      // console.log(this.user._id);
    })
  }

  get name(){
    return this.myForm.get('name');
  }


  // get role(){
  //   return this.myForm.get('role');
  // }


  get email(){
    return this.myForm.get('email');
  }


  get password(){
    return this.myForm.get('password');
  }

  submit(){
    // console.log(this.myForm.value)

    this.service.patch('users/'+ this.id,this.myForm.value, this.tempToken).subscribe(
      (data:any)=>{
      // console.log(data.token);
      // console.log(this.tokenId);
      // this.verifyMail = 'Check your email for verification link';
      // this.router.navigate(['/login']);
      this.router.navigateByUrl(`users/details/${this.user._id}`);
    },
    (error)=>{
      // console.log('Error in login is: ', error);
      this.errorMsg = error.error.message;
      // this.registerForm.markAsPristine();
    }
    )
      // this.register=false;
      // this.verify=true;
  }
  reset(){
    this.myForm.reset();
  }
}
