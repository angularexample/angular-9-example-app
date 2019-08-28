import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {XxxSearchService} from '@app/modules/xxx-search/xxx-search.service';
import {XxxEventMgrService, XxxMessageService, XxxStateStoreService} from '@app/xxx-common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-search-box',
  templateUrl: './xxx-search-box.component.html',
  styleUrls: ['./xxx-search-box.component.scss']
})

export class XxxSearchBoxComponent implements OnDestroy, OnInit {
  isButtonDisabled = false;
  isSearchTextNotChanged = true;
  searchText: string;
  subscriptionButtonEnable: Subscription;
  private lastSearchText: string = null;

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private xxxEventMgrService: XxxEventMgrService,
      private xxxMessageService: XxxMessageService,
      private xxxSearchService: XxxSearchService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
  }

  ngOnInit(): void {
    this.subscribeToMessages();
  }

  onInputKeyUp() {
    this.checkForChangedSearchText();
    this.changeDetectorRef.detectChanges();
  }

  onSearchClick() {
    this.lastSearchText = this.searchText;
    this.isButtonDisabled = true;
    this.changeDetectorRef.detectChanges();
    this.xxxStateStoreService.putItem('searchText', this.searchText);
    this.xxxEventMgrService.handleEvent('searchBox.search');
  }

  ngOnDestroy(): void {
    this.subscriptionButtonEnable.unsubscribe();
  }

  private checkForChangedSearchText() {
    this.isSearchTextNotChanged = (this.searchText === this.lastSearchText);
  }

  private subscribeToMessages() {
    this.subscriptionButtonEnable = this.xxxMessageService.subscribe('searchButtonEnable', () => {
      this.isButtonDisabled = false;
      this.checkForChangedSearchText();
      this.changeDetectorRef.detectChanges();
    });
  }
}
