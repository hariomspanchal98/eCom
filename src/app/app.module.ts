import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './seller/auth/login/login.component';
import { RegisterComponent } from './seller/auth/register/register.component';
import { ProfileComponent } from './seller/user/profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthGuard } from './auth.guard';
import { VerifyComponent } from './seller/auth/verify/verify.component';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { JwPaginationModule } from 'jw-angular-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AvatarModule } from 'ngx-avatar';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './customer/state/cart.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    VerifyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    RecaptchaV3Module,
    JwPaginationModule,
    Ng2SearchPipeModule,
    AvatarModule,
    IvyCarouselModule,
    StoreModule.forRoot({ cart:cartReducer }),
  ],
  providers: [AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi:true,
  },
  {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('365586852354146')
          },

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI" }
],
  bootstrap: [AppComponent ]
})
export class AppModule { }
