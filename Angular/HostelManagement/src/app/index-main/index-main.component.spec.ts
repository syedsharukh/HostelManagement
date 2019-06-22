import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMainComponent } from './index-main.component';

describe('IndexMainComponent', () => {
  let component: IndexMainComponent;
  let fixture: ComponentFixture<IndexMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
