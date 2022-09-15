import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

import { ResetComponent } from './reset.component';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetComponent ],
      imports: [RouterModule.forChild([]), HttpClientModule,NgDompurifyModule, RouterTestingModule, RecaptchaV3Module],
      providers: [
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI" }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
