import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

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
  constructor(private service: HttpService, private router: Router) {}

  tempToken: any;
  length;
  pageSize;
  searchTerm = '';
  term = '';
  subusers;
  index;
  size;
  i = 1;

  ngOnInit() {
    this.tempToken = localStorage.getItem('token');
    // this.service.secureGet('users',this.tempToken).subscribe((data) => {
    //   // console.log(data);
    //   this.users = data;
    //   // console.log(this.users.results);
    //   this.subusers = this.users.results;
    //   // console.log(this.users?.results);
    //   this.length= this.users.totalResults;
    //   this.pageSize= this.users.limit;
    // })
    this.getData(1, 10);
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
}
