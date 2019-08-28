import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import {environment} from '@env/environment';

import {XxxAlertType} from '../xxx-alert/xxx-alert.enum';
import {XxxMessage} from '../xxx-message/xxx-message';
import {XxxMessageService} from '../xxx-message/xxx-message.service';

@Injectable({providedIn: 'root'})
export class XxxDataResponseInterceptor implements HttpInterceptor {
  constructor(private xxxMessageService: XxxMessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(
            catchError((err: any) => {
              let errorMsg = '';
              if (err instanceof HttpErrorResponse) {
                if (!navigator.onLine) {
                  errorMsg = 'Not connected to internet.';
                } else {
                  if (err.status === 401) {
                    this.handleAuthError();
                  } else {
                    errorMsg = `Error Code: ${err.status},  Message: ${err.message}`;
                  }
                }
              } else {
                errorMsg = 'Unknown Error. Response format not recognized.';
              }
              this.handleError(errorMsg);
              return throwError(errorMsg);
            })
        );
  }

  private handleError(errorMsg): void {
    const message = new XxxMessage('data.responseError');
    message.payload = {
      alertType: XxxAlertType.ERROR,
      alertMessage: errorMsg
    };
    this.xxxMessageService.broadcast(message);
  }

  private handleAuthError(): void {
    // TODO added temporary console log for testing this stub
    console.log('HTTP 401 error');
    // TODO Needs back end service to do auth and handle redirect url
    // let client = new XMLHttpRequest();
    // let parts = window.location.pathname.split('/');
    // const url = environment.serviceRootUrl + parts[1] + '/login?redirectUrl=' + window.location.href;
    // client.open('POST', url, true);
    // client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // client.withCredentials = true;
    // client.send();
    // client.onreadystatechange = function () {
    //   if (this.status === 401 && this.readyState === this.HEADERS_RECEIVED) {
    //     window.parent.location.href = client.getResponseHeader('Location');
    //   }
    // };
  }
}
