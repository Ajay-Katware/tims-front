import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermissionDialogComponent } from './edit-permission-dialog.component';

describe('EditPermissionDialogComponent', () => {
  let component: EditPermissionDialogComponent;
  let fixture: ComponentFixture<EditPermissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPermissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
