import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {environment} from '@env/environment';
import {XxxDataService} from '../xxx-data/xxx-data.service';
import {XxxEventAction, XxxEventConfig, XxxEventRoute} from './xxx-event.interface';
import {XxxMessage} from '../xxx-message/xxx-message';
import {XxxMessageService} from '../xxx-message/xxx-message.service';
import {XxxStateStoreService} from '../xxx-state-store/xxx-state-store.service';

@Injectable({providedIn: 'root'})
export class XxxEventMgrService implements OnDestroy {
  private $data: Subscription;
  private eventConfigs: XxxEventConfig[];
  private isValid = false;

  constructor(private router: Router,
              private xxxDataService: XxxDataService,
              private xxxMessageService: XxxMessageService,
              private xxxStateStoreService: XxxStateStoreService
  ) {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.$data.unsubscribe();
  }

  // Component calls this method to handle any event.
  handleEvent(eventId): void {
    if (typeof this.eventConfigs === 'undefined') {
      return;
    }
    const eventConfig: XxxEventConfig = this.getEventConfig(eventId);
    if (typeof eventConfig !== 'undefined' && eventConfig.hasOwnProperty('eventActions') && eventConfig.eventActions.length) {
      eventConfig.eventActions.forEach(this.doEventAction, this);
    }
  }

  private loadData(): void {
    this.$data = this.xxxDataService.getData(environment.url.eventConfig)
        .subscribe(result => this.onSuccessGetData(result),
            () => this.onErrorGetData());
  }

  private onSuccessGetData(response: any): void {
    this.validateData(response);
    if (this.isValid) {
      this.loadModelData(response);
    }
  }

  // Note: The error interceptor actually handles all data request errors.
  private onErrorGetData(): void {
    console.log('XxxEventMgrService: ERROR in loadData');
  }

  private loadModelData(theData: any) {
    // Transform data input to local data model.
    this.eventConfigs = theData.eventConfigs;
  }

  private validateData(theData: any): void {
    let isValid = true;
    isValid = isValid && (theData.hasOwnProperty('eventConfigs'));
    isValid = isValid && (typeof theData.eventConfigs === 'object');
    isValid = isValid && (theData.eventConfigs.length > 0);
    this.isValid = isValid;
  }

  // Returns undefined if not found.
  private getEventConfig(eventId: string): any {
    return this.eventConfigs.find(o => o.eventId === eventId);
  }

  private doEventAction(eventAction: XxxEventAction): void {
    switch (eventAction.action) {
      case 'broadcast':
        this.broadcastAction(eventAction);
        break;
      case 'route':
        this.routeAction(eventAction);
        break;
    }
  }

  private broadcastAction(eventAction: XxxEventAction) {
    let message: XxxMessage;
    if (eventAction.hasOwnProperty('actionKey')) {
      message = new XxxMessage(eventAction.actionKey);
      if (eventAction.hasOwnProperty('actionData')) {
        message.payload = eventAction.actionData;
      }
      this.xxxMessageService.broadcast(message);
    }
  }

  private routeAction(eventAction: XxxEventAction) {
    if (eventAction.hasOwnProperty('actionKey')) {
      const eventUrl: XxxEventRoute = this.xxxStateStoreService.getItem(eventAction.actionKey);
      if ((typeof eventUrl === 'object') && eventUrl.url.length > 0) {
        this.router.navigate(eventUrl.url, {queryParams: eventUrl.queryParams});
      }
    }
  }
}
