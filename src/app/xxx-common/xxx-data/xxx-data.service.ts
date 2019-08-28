import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class XxxDataService {
  constructor(private httpClient: HttpClient) {
  }

  getData(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
}
