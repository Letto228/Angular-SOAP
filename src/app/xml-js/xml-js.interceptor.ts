import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {xml2js} from 'xml-js'

@Injectable()
export class XmlJsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({responseType: 'text'})).pipe(
      map(response => response instanceof HttpResponse
        ? response.clone({
          // body: xml2js(response.body, {compact: true}),
          body: xml2js(response.body, {compact: false}),
        })
        : response,
      )
    );
  }
}
