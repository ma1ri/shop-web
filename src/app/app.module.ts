import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { ErrorComponent } from './shared/errors/error/error.component';
import { ErrorInterceptor } from './shared/interceptors/error-interceptor';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
