import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermissionDailogComponent } from './add-permission-dailog.component';

describe('AddPermissionDailogComponent', () => {
  let component: AddPermissionDailogComponent;
  let fixture: ComponentFixture<AddPermissionDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPermissionDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermissionDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
