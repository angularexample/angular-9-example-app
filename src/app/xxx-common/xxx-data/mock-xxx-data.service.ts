import {Observable, of} from 'rxjs';

export class MockXxxDataService {
  getData(url: string): Observable<any> {
    return of({});
  }
}
