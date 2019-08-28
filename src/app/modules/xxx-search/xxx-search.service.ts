import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {environment} from '@env/environment';
import {XxxEventMgrService, XxxEventRoute, XxxMessageService, XxxStateStoreService} from '@app/xxx-common';

/**
 * Subscribes to search text changed message, generates and stores route, triggers route event.
 */
@Injectable({providedIn: 'root'})
export class XxxSearchService {
  private searchText = null;
  private subscriptionSearchTextChange: Subscription;

  constructor(
      private xxxEventMgrService: XxxEventMgrService,
      private xxxMessageService: XxxMessageService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages() {
    this.subscriptionSearchTextChange = this.xxxMessageService.subscribe('searchTextChange', () => {
      this.onSearchTextChange();
    });
  }

  private onSearchTextChange() {
    const searchText = this.xxxStateStoreService.getItem('searchText');
    if ((typeof searchText === 'string') && (searchText.length > 0) && (searchText !== this.searchText)) {
      const encodedSearchText = encodeURI(searchText);
      const eventRoute: XxxEventRoute = {
        url: [environment.url.questions],
        queryParams: {
          title: encodedSearchText
        }
      };
      this.xxxStateStoreService.putItem('questionsRoute', eventRoute);
      this.xxxEventMgrService.handleEvent('routeQuestions');
    }
  }
}
