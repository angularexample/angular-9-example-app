import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatToolbarModule} from '@angular/material/toolbar';

import {XxxHeaderComponent} from './xxx-header.component';
import {XxxSearchBoxComponent} from '../xxx-search-box/mock-xxx-search-box.component';

describe('XxxHeaderComponent', () => {
  let component: XxxHeaderComponent;
  let fixture: ComponentFixture<XxxHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        XxxHeaderComponent,
        XxxSearchBoxComponent
      ],
      imports: [
        CommonModule,
        MatToolbarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxxHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
