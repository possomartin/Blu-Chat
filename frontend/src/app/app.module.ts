import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WebInterceptorService } from './services/web-interceptor.service';
import { BluComponent } from './views/blu/blu.component';
import { UserMenuComponent } from './views/user-menu/user-menu.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AddressBookComponent } from './views/address-book/address-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BluComponent,
    UserMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddressBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: WebInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
