import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {XxxHomePageComponent} from './xxx-home-page.component';

describe('XxxHomePageComponent', () => {
  let component: XxxHomePageComponent;
  let fixture: ComponentFixture<XxxHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxHomePageComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxxHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
