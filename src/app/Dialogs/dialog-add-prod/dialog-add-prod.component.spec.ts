import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProdComponent } from './dialog-add-prod.component';

describe('DialogAddProdComponent', () => {
  let component: DialogAddProdComponent;
  let fixture: ComponentFixture<DialogAddProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
