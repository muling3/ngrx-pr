import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { TestDirective } from './directives/test.directive';
import { TestStructuralDirective } from './directives/test-structural.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPrintModule } from 'ngx-print';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DraggableComponent } from './components/draggable/draggable.component';
import { LoggingInterceptor } from './services/logging.interceptor';

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
    RegisterComponent,
    TestDirective,
    TestStructuralDirective,
    DraggableComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot([
      {
        path: '',
        component: BlogsComponent,
        pathMatch: 'full',
        title: 'home',
        canActivate: [AuthGuard],
      },
      {
        path: 'counter',
        component: CounterComponent,
        pathMatch: 'full',
        title: 'home',
        canActivate: [AuthGuard],
      },
      {
        path: 'auth',
        component: LoginComponent,
        pathMatch: 'full',
        title: 'auth',
      },
      {
        path: 'drag',
        component: DraggableComponent,
        pathMatch: 'full',
        title: 'auth',
        canActivate: [AuthGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
        title: 'Register',
        canActivate: [AuthGuard],
      },
      {
        path: 'blog/:id',
        component: BlogItemComponent,
        pathMatch: 'full',
        title: 'item',
        canActivate: [AuthGuard],
      },
      { path: '**', component: NotFoundComponent, title: 'Not found' },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
