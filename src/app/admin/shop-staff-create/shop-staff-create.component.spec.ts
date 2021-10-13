import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStaffCreateComponent } from './shop-staff-create.component';

describe('ShopStaffCreateComponent', () => {
  let component: ShopStaffCreateComponent;
  let fixture: ComponentFixture<ShopStaffCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopStaffCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopStaffCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
