import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {XxxPageNotFoundPageComponent} from './xxx-page-not-found-page.component';

describe('XxxPageNotFoundPageComponent', () => {
  let component: XxxPageNotFoundPageComponent;
  let fixture: ComponentFixture<XxxPageNotFoundPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxPageNotFoundPageComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxxPageNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
