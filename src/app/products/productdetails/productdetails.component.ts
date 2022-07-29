import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  tempToken:any;

  constructor(private _Activatedroute:ActivatedRoute,private router: Router, private service: HttpService) { }

  id:any;
  product:any;
  previewImgUrl;

  ngOnInit(): void {
    this.tempToken = (localStorage.getItem('token'));

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.service.get('products/'+this.id).subscribe((data:any)=>{
      console.log(data);
      this.product=data;
      this.previewImgUrl= this.product?.images[0].url;
      console.log(this.previewImgUrl);
      // console.log(this.user);
    })
  }
  remove(url: any) {
    // console.log(url);
    this.service.del('products/' + url, this.tempToken).subscribe(
      (data: any) => {
        // console.log(data);
        console.log('Deleted');
        this.router.navigateByUrl(`products/allproducts`);
      },
      (error) => {
      }
    );
    // console.log('users/'+ (url));
  }

  sweetAlert(abc){
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

}
