import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatureModule } from './features/feature.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './pages/auth/auth.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminModule } from './pages/admin/admin.module';
import { GuestModule } from './pages/guest/guest.module';
import { SuperuserModule } from './pages/superuser/superuser.module';
import { LoaderComponent } from './features/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/http.interceptor';

import { ToastModule } from 'primeng/toast';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatureModule,
    AuthModule,
    SuperuserModule,
    AdminModule,
    GuestModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
