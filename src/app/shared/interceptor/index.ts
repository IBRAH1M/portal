/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorInterceptor} from './http-error.interceptor';
import {HttpHeaderInterceptor} from './http-header.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true}
];
