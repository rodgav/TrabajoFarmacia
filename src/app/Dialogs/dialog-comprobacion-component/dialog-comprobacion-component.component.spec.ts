import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComprobacionComponentComponent } from './dialog-comprobacion-component.component';

describe('DialogComprobacionComponentComponent', () => {
  let component: DialogComprobacionComponentComponent;
  let fixture: ComponentFixture<DialogComprobacionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComprobacionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComprobacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
