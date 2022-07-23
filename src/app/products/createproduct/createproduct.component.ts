import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  myForm:any;
  tempToken;
  selectedFile;

  constructor(private service:HttpService) { }

  ngOnInit(): void {

    this.tempToken = (localStorage.getItem('token'));

    this.myForm = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      images : new FormControl(''),
    })

  }

  get name(){
    return this.myForm.get('name');
  }


  get images(){
    return this.myForm.get('images');
  }


  get description(){
    return this.myForm.get('description');
  }

  onFileSelected(event){
this.selectedFile = <File>event.target.files[0]
  }

  submit(){
    const fd = new FormData();
    fd.append('images',this.selectedFile, this.selectedFile.name),


    console.log(this.myForm.value);
    this.service.securePost('products',this.tempToken,this.myForm.value).subscribe(
      ()=>{
        console.log('added')
      },
      (error:any)=>{
        // console.log('Error in login is: ', error);
        console.log(error);
        // this.registerForm.markAsPristine();
      }
    )
  }
}
