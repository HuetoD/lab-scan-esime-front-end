import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCuentasComponent } from './crud-cuentas.component';

describe('CrudCuentasComponent', () => {
  let component: CrudCuentasComponent;
  let fixture: ComponentFixture<CrudCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCuentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
