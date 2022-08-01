import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tempToken;
  products;
  i=0;
  index: number=this.service.pageNo;
  size: number;
  lengthy: any;
  pageSize: any=this.service.limitNo;
  sub: any;
  searchTerm:'';

  constructor(private service:HttpService, private router:Router) { }

  ngOnInit(): void {
    this.tempToken = (localStorage.getItem('token'));
    console.log("token is",this.tempToken);
    // this.service.get("auth/self",this.tempToken)
    // this.service.getProfileData(this.tempToken)
    // this.service.secureGet('products',this.tempToken).subscribe((res:any)=>{
    //   console.log(res);
    //   // let output = JSON.parse(res)
    //   this.products = res;
    //   console.log(this.products);
    //   // console.log('profile data from service:- ',this.profileData);
    //   // console.table(this.products?.results)
    // },
    // (error) => {
    //   console.log('Error in login is: ', error)
    //   // this.clear();
    //   // this.registerForm.markAsPristine();
    // },
    console.log(this.service.pageNo);
    console.log(this.service.limitNo);
    // );
    this.getData(this.service.pageNo, this.service.limitNo);
  }

  getData(index, size) {
    this.index = index;
    this.size = size;
    this.service
      .secureGet(`products?limit=${this.size}&page=${this.index}`, this.tempToken)
      .subscribe((data) => {
        // console.log(data);
        this.products = data;

        console.log(this.products.results);

        this.sub = this.products.results;
        // console.log(this.users?.results);
        this.lengthy = this.products.totalResults;
        this.pageSize = this.products.limit;
      });
  }

  search(value: string): void {
    this.products.results = this.sub.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

  changeTable(e: PageEvent) {
    // console.log(e);
    this.index = e.pageIndex + 1;
    this.size = e.pageSize;
    // console.log(e);
    // console.log(environment.baseUrl+'users?page='+index+'&limit='+e.pageSize);
    this.service
      .secureGet(
        'products?page=' + this.index + '&limit=' + e.pageSize,
        this.tempToken
      )
      .subscribe((data) => {
        // console.log(data);
        // console.log(data);
        this.products = data;
        // console.log(this.users.results);
        this.sub = this.products.results;
        // console.log(this.users?.results);
        // this.length= this.users.totalResults;
        // this.pageSize= this.users.limit;
        this.service.pageNo=e.pageIndex+1;
        this.service.limitNo=e.pageSize;

      });
  }

}
