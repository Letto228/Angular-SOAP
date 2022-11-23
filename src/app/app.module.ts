import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { CustomSoapSupportInterceptor } from './custom-soap-support/custom-soap-support.interceptor';
import { XmlJsInterceptor } from './xml-js/xml-js.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CustomSoapSupportInterceptor,
    //   multi: true,
    // }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XmlJsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
