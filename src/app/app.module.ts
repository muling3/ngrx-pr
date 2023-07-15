import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './reducers';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { ModalComponent } from './modal/modal.component';
import { TestComponent } from './test/test.component';
import { RouterModule } from '@angular/router';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    // BrowserModule,
    RouterModule.forRoot([
      { path: '', component: CounterComponent },
      { path: 'test', component: TestComponent },
      { path: 'table', component: DynamicTableComponent },
    ]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    TestComponent,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true}
  ],
  bootstrap: [],
})
export class AppModule {}
