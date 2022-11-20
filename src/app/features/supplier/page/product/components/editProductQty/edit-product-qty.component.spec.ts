import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductQtyComponent } from './edit-product-qty.component';

describe('EditProductQtyComponent', () => {
  let component: EditProductQtyComponent;
  let fixture: ComponentFixture<EditProductQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductQtyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
