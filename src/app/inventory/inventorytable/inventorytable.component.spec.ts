import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorytableComponent } from './inventorytable.component';

describe('TableComponent', () => {
  let component: InventorytableComponent;
  let fixture: ComponentFixture<InventorytableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorytableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
