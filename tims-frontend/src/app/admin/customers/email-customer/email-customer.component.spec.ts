import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCustomerComponent } from './email-customer.component';

describe('EmailCustomerComponent', () => {
  let component: EmailCustomerComponent;
  let fixture: ComponentFixture<EmailCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
