import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getToken } from 'src/app/auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
      if( !token ) {
        return next.handle(request);
      }
      let modifiedReq = request.clone({
        params: request.params.append('auth', token)
      });
      return next.handle(modifiedReq);
    })
    );

    return next.handle(request);
  }
}
