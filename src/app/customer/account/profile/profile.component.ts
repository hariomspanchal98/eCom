import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

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
  profileForm: any;
  profilePhoto: any;
  profilePhotoUrl: any;
  addresses: any;
  addressForm: any;

  constructor(
    private router: Router,
    private service: HttpService,
    private authService: SocialAuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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
    formData.append('picture', this.profilePhoto);

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
    console.log(event);
    this.profilePhoto = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.profilePhoto);
    reader.onload = (event) => {
      this.profilePhotoUrl = event.target.result;
      // this.imgFlag[1].push(false);
    };
  }

  cancel() {
    this.profileEdit = false;
    this.updatePhoto = false;
    this.addAddress = false;
    this.editAddress = false;
  }

  editProfile() {
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
      },
      (error) => {
        console.log('Error in Delete is: ', error);
      }
    );
  }

  getAdd() {
    this.service.secureGet('customers/address', this.tempToken).subscribe(
      (res: any) => {
        this.addresses = res;
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
  }
}
