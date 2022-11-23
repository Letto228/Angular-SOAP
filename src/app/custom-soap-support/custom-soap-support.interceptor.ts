import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
// import { xmlStringToJson } from './xml-to-json-original';
import { xmlStringToJson } from './xml-to-json';

@Injectable()
export class CustomSoapSupportInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({responseType: 'text'})).pipe(
      map(response => response instanceof HttpResponse
        ? response.clone({
          body: xmlStringToJson(response.body),
        })
        : response,
      )
    );
  }
}
