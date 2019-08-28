import {Params, UrlSegment} from '@angular/router';

export interface XxxEventConfig {
  eventId: string;
  eventActions: XxxEventAction[];
}

export interface XxxEventAction {
  action: string;
  actionData?: any;
  actionKey?: string;
}

export interface XxxEventRoute {
  url: string[];
  queryParams?: Params;
}
