import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewpasswordComponent } from './request-newpassword.component';

describe('RequestNewpasswordComponent', () => {
  let component: RequestNewpasswordComponent;
  let fixture: ComponentFixture<RequestNewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestNewpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
