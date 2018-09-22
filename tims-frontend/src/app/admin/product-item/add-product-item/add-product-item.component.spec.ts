import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductItemComponent } from './add-product-item.component';

describe('AddProductItemComponent', () => {
  let component: AddProductItemComponent;
  let fixture: ComponentFixture<AddProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
