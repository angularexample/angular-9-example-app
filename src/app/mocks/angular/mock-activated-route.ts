import {of} from 'rxjs';

export const mockRouteParamId = 'id-test';

export class MockActivatedRouteWithId {
  params = of({id: mockRouteParamId});
}

export const mockQueryParamTitle = 'title-test';
export const mockQueryParamPage = '3';

export class MockActivatedRouteWithQueryParms {
  queryParams = of({
    title: mockQueryParamTitle,
    page: mockQueryParamPage
  });
}
