import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTenantComponent } from './popup-tenant.component';

describe('PopupTenantComponent', () => {
  let component: PopupTenantComponent;
  let fixture: ComponentFixture<PopupTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
