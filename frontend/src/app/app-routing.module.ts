import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './views/address-book/address-book.component';
import { BluComponent } from './views/blu/blu.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {path:'', redirectTo:'blu-chat', pathMatch:'full'},
  {path: 'blu-chat', component: BluComponent},
  {path: 'blu-chat/:id', component: BluComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'profile', component: ProfileComponent},
  {path:'address-book', component: AddressBookComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
