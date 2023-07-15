import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { CounterComponent } from './app/counter/counter.component';
import { TestComponent } from './app/test/test.component';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { reducers } from './app/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { DynamicTableComponent } from './app/dynamic-table/dynamic-table.component';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const ROUTES: Routes = [
  { path: '', component: CounterComponent },
  { path: 'test', component: TestComponent },
      { path: 'table', component: DynamicTableComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideStore(reducers),
    provideStoreDevtools(),
    importProvidersFrom(AppModule)
  ],
});
