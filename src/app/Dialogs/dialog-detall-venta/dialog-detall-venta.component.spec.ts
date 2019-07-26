import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetallVentaComponent } from './dialog-detall-venta.component';

describe('DialogDetallVentaComponent', () => {
  let component: DialogDetallVentaComponent;
  let fixture: ComponentFixture<DialogDetallVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetallVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetallVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
