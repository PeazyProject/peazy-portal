import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOrderItemComponent } from './check-order-item.component';

describe('CheckOrderItemComponent', () => {
  let component: CheckOrderItemComponent;
  let fixture: ComponentFixture<CheckOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
