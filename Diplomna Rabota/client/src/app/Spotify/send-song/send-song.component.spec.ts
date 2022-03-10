import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSongComponent } from './send-song.component';

describe('SendSongComponent', () => {
  let component: SendSongComponent;
  let fixture: ComponentFixture<SendSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
