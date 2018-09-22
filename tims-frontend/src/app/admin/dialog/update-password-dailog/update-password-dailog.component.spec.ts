import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordDailogComponent } from './update-password-dailog.component';

describe('UpdatePasswordDailogComponent', () => {
  let component: UpdatePasswordDailogComponent;
  let fixture: ComponentFixture<UpdatePasswordDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePasswordDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
