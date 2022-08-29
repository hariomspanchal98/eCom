import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  base64ToFile,
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  tempToken: string;
  profileEdit: boolean = false;
  updatePhoto: boolean = false;
  addAddress: boolean = false;
  editAddress: boolean = false;
  delPhoto: boolean = false;
  swapImage: boolean = false;
  finalImage: boolean = false;
  updateImg: boolean = true;
  profileForm: any;
  profilePhoto: any;
  profilePhotoUrl: any;
  addresses: any;
  addressForm: any;
  tempAddId: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  orders: any;
  pageSize = 1;
  pageLimit = 5;
  orderDetails:any;

  constructor(
    private router: Router,
    private service: HttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if (!!!localStorage.getItem('customerToken')) {
      console.log(!!localStorage.getItem('customerToken'));
      // this.router.navigateByUrl('/seller/user/profile');
      this.router.navigate(['auth/login']);
    }

    this.tempToken = localStorage.getItem('customerToken');

    this.service.secureGet('shop/auth/self', this.tempToken).subscribe(
      (res: any) => {
        this.profileData = res;
        this.profilePhotoUrl = this.profileData?.picture;
        console.log(res);
        // console.log(this.profileData);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  submitProfile() {
    // console.log(this.profileForm.value);
    let formData = new FormData();
    if (!this.delPhoto) {
      formData.append('picture', base64ToFile(this.croppedImage));
    }

    this.service
      .securePost('customers/profile-picture', this.tempToken, formData)
      .subscribe(
        (data: any) => {
          this.profilePhotoUrl = data.picture;
          console.log('succes');
          console.log(data);
        },
        (error) => {
          console.log(error.error);
        }
      );

    this.service
      .patch('customers/update-profile', this.profileForm.value, this.tempToken)
      .subscribe(
        (data: any) => {
          this.profileData = data;
          console.log(data);
        },
        (error) => {
          console.log(error.error.message);
        }
      );

    this.cancel();
  }

  onFileSelected(event) {
    this.imageChangedEvent = event;
    this.swapImage = true;
  }

  cancel() {
    this.profileEdit = false;
    this.updatePhoto = false;
    this.addAddress = false;
    this.editAddress = false;
  }

  editProfile() {
    this.delPhoto = false;

    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.profileForm.patchValue({
      name: this.profileData.name,
      email: this.profileData.email,
    });

    this.profileEdit = true;
  }

  deleteProfilePhoto() {
    this.service.del('customers/profile-picture', this.tempToken).subscribe(
      (data: any) => {
        console.log('Deleted');
        this.profilePhotoUrl = 'https://i.imgur.com/CR1iy7U.png';
        this.delPhoto = true;
      },
      (error) => {
        console.log('Error in Delete is: ', error);
      }
    );
  }

  getAdd() {
    this.service.secureGet('customers/address', this.tempToken).subscribe(
      (res: any) => {
        // console.log(res);
        this.addresses = res;
        // console.log('address got');
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
  }

  addAdd() {
    this.addAddress = true;
    this.addressForm = this.fb.group({
      street: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pin: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
  }

  submitAdd() {
    console.log(this.addressForm.value);
    this.service
      .securePost('customers/address', this.tempToken, this.addressForm.value)
      .subscribe({
        next: (data: any) => {
          console.log('Created Succesfully');
          console.log(data);
          this.addAddress = false;
          this.getAdd();
        },
        error: (error) => {
          error.error.message;
        },
      });
  }

  delAdd(url: any) {
    // console.log(url);
    this.service.del('customers/address/' + url, this.tempToken).subscribe(
      (data: any) => {
        console.log('deleted');
        this.getAdd();
      },
      (error) => {
        console.log('Error in login is: ', error);
      }
    );
  }

  editAdd(i) {
    this.editAddress = true;
    this.addAdd();

    this.addressForm.patchValue({
      street: this.addresses[i].street,
      addressLine2: this.addresses[i].addressLine2,
      city: this.addresses[i].city,
      state: this.addresses[i].state,
      pin: this.addresses[i].pin,
    });

    this.tempAddId = this.addresses[i]._id;
  }

  updateAdd() {
    this.service
      .securePut(
        'customers/address/' + this.tempAddId,
        this.tempToken,
        this.addressForm.value
      )
      .subscribe(
        (data: any) => {
          console.log('updated');
          this.tempAddId = '';
          this.getAdd();
          this.cancel();
        },
        (error) => {
          console.log('Error in update is: ', error);
        }
      );
  }

  delete() {
    // console.log(url);
    this.service.del('customers/account', this.tempToken).subscribe(
      (data: any) => {
        // console.log(data);
        localStorage.clear();
        console.log('Deleted');
        this.router.navigateByUrl(`products/all-products`);
      },
      (error) => { }
    );
    // console.log('users/'+ (url));
  }

  sweetAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete();
        Swal.fire('Deleted!', 'Your Account has been deleted.', 'success');
      }
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, '<fsiodhgoshdo>', base64ToFile(event.base64));
    // console.log('croppedImage---->', this.croppedImage);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  finalImg() {
    this.finalImage = true;
    this.swapImage = true;
    this.updatePhoto = false;
  }

  getOrder() {
    this.service.secureGet(`shop/orders?page=${this.pageSize}&limit=${this.pageLimit}`, this.tempToken).subscribe(
      (res: any) => {
        console.log(res);
        this.orders = res;
        console.log('orders got');
        console.log(this.orders);
        this.setFlag();
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
  }

  setFlag()
  {
    for (let i = 0; i < this.orders?.results.length; i++) {
      if (this.orders.results[i].status == "Pending") {
        this.orders.results[i].details = false;
        this.orders.results[i].flag = 'false';
      }
      else { this.orders.results[i].flag = 'true'; 
      this.orders.results[i].details = false;
    }
    }
  }

  loadOrder() {
    this.pageLimit += 5;
    this.getOrder();
  }

  viewOrder(x: any, i:any) {
    this.setFlag();
    this.orders.results[i].details = true;
    this.service.secureGet(`shop/orders/${x}`, this.tempToken).subscribe(
      (res: any) => {
        // console.log(res);
        this.orderDetails = res[0];
        console.log(this.orderDetails?.items);
      },
      (error) => {
        console.log('Error ...>', error.error.message);
      }
    );
  }

  delOrder(id: any) {
    // console.log(url);
    this.service.del(`shop/orders/` + id, this.tempToken).subscribe(
      (data: any) => {
        console.log('deleted');
        this.getOrder();
      },
      (error) => {
        console.log('Error in order deletion is: ', error);
      }
    );
  }

  retryPayment(abc:any){
    this.service.orderId = abc;
    this.service.orderValue = this.orderDetails.total + this.orderDetails.deliveryFee;
    this.router.navigateByUrl(`products/checkout/payment`);
  }

}
