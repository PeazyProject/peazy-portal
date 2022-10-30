import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductDetailComponent } from './display-product-detail.component';

describe('DisplayProductDetailComponent', () => {
  let component: DisplayProductDetailComponent;
  let fixture: ComponentFixture<DisplayProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
