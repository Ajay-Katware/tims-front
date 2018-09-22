import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesOrderComponent } from './create-sales-order.component';

describe('CreateSalesOrderComponent', () => {
  let component: CreateSalesOrderComponent;
  let fixture: ComponentFixture<CreateSalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSalesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
