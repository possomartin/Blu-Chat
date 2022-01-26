import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebInterceptorService } from './services/web-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { BluComponent } from './views/blu/blu.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UserMenuComponent } from './views/user-menu/user-menu.component';
import { AddressBookComponent } from './views/address-book/address-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BluComponent,
    ProfileComponent,
    UserMenuComponent,
    AddressBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: WebInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
