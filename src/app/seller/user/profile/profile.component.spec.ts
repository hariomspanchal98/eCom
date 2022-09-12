import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [HttpClientModule,RecaptchaV3Module],
      providers: [
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
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI" },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
