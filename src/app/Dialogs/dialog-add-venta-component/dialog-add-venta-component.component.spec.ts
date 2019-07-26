import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddVentaComponentComponent } from './dialog-add-venta-component.component';

describe('DialogAddVentaComponentComponent', () => {
  let component: DialogAddVentaComponentComponent;
  let fixture: ComponentFixture<DialogAddVentaComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddVentaComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVentaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
