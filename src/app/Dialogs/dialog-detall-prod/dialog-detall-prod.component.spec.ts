import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetallProdComponent } from './dialog-detall-prod.component';

describe('DialogDetallProdComponent', () => {
  let component: DialogDetallProdComponent;
  let fixture: ComponentFixture<DialogDetallProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetallProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetallProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
