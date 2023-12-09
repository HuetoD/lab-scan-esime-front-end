import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guest1Component } from './guest1.component';

describe('Guest1Component', () => {
  let component: Guest1Component;
  let fixture: ComponentFixture<Guest1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Guest1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
