import {DebugElement} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {By} from '@angular/platform-browser';

import {MockXxxEventMgrService, MockXxxStateStoreService} from '@app/xxx-common/test';
import {MockXxxSearchService} from '@app/modules/xxx-search/mock-xxx-search.service';
import {XxxEventMgrService, XxxMessage, XxxMessageService, XxxStateStoreService} from '@app/xxx-common';
import {XxxSearchService} from '@app/modules/xxx-search/xxx-search.service';
import {XxxSearchBoxComponent} from './xxx-search-box.component';

describe('XxxSearchBoxComponent', () => {
  let buttonElement: HTMLButtonElement;
  let component: XxxSearchBoxComponent;
  let fixture: ComponentFixture<XxxSearchBoxComponent>;
  let inputElement: HTMLInputElement;
  let spyEventMgrService: jasmine.Spy;
  let spyStateStoreService: jasmine.Spy;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxMessageService: XxxMessageService;
  let xxxStateStoreService: XxxStateStoreService;
  let xxxSearchService: XxxSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxSearchBoxComponent],
      imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        {provide: XxxEventMgrService, useClass: MockXxxEventMgrService},
        XxxMessageService,
        {provide: XxxSearchService, useClass: MockXxxSearchService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxxSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrService = spyOn(xxxEventMgrService, 'handleEvent');
    xxxMessageService = TestBed.get(XxxMessageService);
    xxxSearchService = TestBed.get(XxxSearchService);
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyStateStoreService = spyOn(xxxStateStoreService, 'putItem');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should run keyup handler', () => {
    component.onInputKeyUp();
    expect(component).toBeDefined();
  });

  it('should instantiate search service', () => {
    expect(xxxSearchService).toBeDefined();
  });

  it('should run event mgr service on click', () => {
    component.onSearchClick();
    expect(spyEventMgrService).toHaveBeenCalled();
  });

  it('should run state store service on click', () => {
    component.onSearchClick();
    expect(spyStateStoreService).toHaveBeenCalled();
  });

  it('should enable button after message received', fakeAsync(() => {
    xxxMessageService.broadcast(new XxxMessage('searchButtonEnable'));
    tick();
    expect(component.isButtonDisabled).toBeFalsy();
  }));
});
