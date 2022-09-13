import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  users: any; //better to have your type
  a: any = 0;
  constructor(private service: HttpService, private router: Router) { }

  tempToken: any;
  length;
  pageSize;
  searchTerm = '';
  term = '';
  subusers;
  index=1;
  size=10;
  i = 1;
  profileData: any;
  roleForm: any;
  updateCompany:any;
  compUp= false;

  ngOnInit() {
    this.tempToken = localStorage.getItem('token');

    this.service.secureGet('auth/self', this.tempToken).subscribe((res: any) => {
      // console.log(res);
      // let output = JSON.parse(res)
      this.profileData = res;
      // console.log('profile data from service:- ',this.profileData);
      this.updateCompany.patchValue({
        email : this.profileData._org.email,
        name : this.profileData._org.name,
      })
    },
      (error) => {
        // console.log('Error in login is: ', error);
        // this.registerForm.markAsPristine();
      },
    );

    this.getData(this.index, this.size);

    this.updateCompany = new FormGroup({
      email : new FormControl('', [Validators.required]),
      name : new FormControl('', [Validators.required])
    })
  }

  getData(index, size) {
    this.index = index;
    this.size = size;
    this.service
      .secureGet(`users?limit=${this.size}&page=${this.index}`, this.tempToken)
      .subscribe((data) => {
        // console.log(data);
        this.users = data;

        console.log(this.users.results);

        this.subusers = this.users.results;
        // console.log(this.users?.results);
        this.length = this.users.totalResults;
        this.pageSize = this.users.limit;
      });
  }

  search(value: string): void {
    this.users.results = this.subusers.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

  updateComp(){
    console.log(this.updateCompany.value);

    this.service.patch('users/org', this.updateCompany.value, this.tempToken).subscribe(
      (data:any)=>{
        console.log(data);
        this.service.secureGet('auth/self', this.tempToken).subscribe((res: any) => {
          this.profileData = res;
        },
          (error) => {
            console.log(error.error);
          },
        );
        this.compUp = false;
      },
      (error:any)=>{
        console.log(error.error);
      }
    )
  }

  cancelCompUp(){
    this.compUp = false;
  }

  changeTable(e: PageEvent) {
    // console.log(e);
    this.index = e.pageIndex + 1;
    this.size = e.pageSize;
    // console.log(environment.baseUrl+'users?page='+index+'&limit='+e.pageSize);
    this.service
      .secureGet(
        'users?page=' + this.index + '&limit=' + e.pageSize,
        this.tempToken
      )
      .subscribe((data) => {
        // console.log(data);
        // console.log(data);
        this.users = data;
        // console.log(this.users.results);
        this.subusers = this.users.results;
        // console.log(this.users?.results);
        // this.length= this.users.totalResults;
        // this.pageSize= this.users.limit;
      });
  }

  remove(url: any) {
    // console.log(url);
    this.service.del('users/' + url, this.tempToken).subscribe(
      (data: any) => {
        // console.log(data);

        this.getData(this.index, this.size);
      },
      (error) => {
        console.log('Error in login is: ', error);
      }
    );
    // console.log('users/'+ (url));
  }

  sweetAlert(abc) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.remove(abc);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  updateRole(r: string, id: any) {

    this.roleForm = new FormGroup({
      role: new FormControl('', Validators.required),
    })

    this.roleForm.patchValue({
      role: r,
    })
    console.log(this.roleForm.value, id);

    this.service.patch('users/role/' +id, this.roleForm.value,this.tempToken).subscribe(
      (data:any)=>{
        console.log(data);
        this.getData(this.index,this.size);
    },
    (error)=>{
    }
    )

  }

}
