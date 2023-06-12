import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './reducers';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ModalComponent,
    BlogsComponent,
    BlogItemComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot([
      { path: '', component: BlogsComponent },
      { path: ':id', component: BlogItemComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
