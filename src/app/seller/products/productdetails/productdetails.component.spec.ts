import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';

import { ProductdetailsComponent } from './productdetails.component';

describe('ProductdetailsComponent', () => {
  let component: ProductdetailsComponent;
  let fixture: ComponentFixture<ProductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdetailsComponent ],
      imports:[HttpClientModule, RouterModule.forRoot([]),NgDompurifyModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
