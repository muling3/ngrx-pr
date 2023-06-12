import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ModalComponent,
    BlogsComponent,
    BlogItemComponent,
    NotFoundComponent,
    SpinnerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot([
      { path: '', component: BlogsComponent, pathMatch: 'full', title: 'home' },
      { path: 'auth', component: LoginComponent, pathMatch: 'full', title: 'auth' },
      {
        path: 'blog/:id',
        component: BlogItemComponent,
        pathMatch: 'full',
        title: 'item',
      },
      { path: '**', component: NotFoundComponent, title: 'Not found' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
