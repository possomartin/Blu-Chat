import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  UserLogin!: boolean;
  private SubscriptionName!: Subscription;

  constructor(private router: Router, private auth: AuthService, private common: CommonService) { }
  
  ngOnInit(): void {
    this.setUserLogin();
  }

  setUserLogin()
  {

    if(localStorage.getItem('user'))
    {
      this.UserLogin = true;
    }
    else
    {
      this.UserLogin = false;
    }

    this.SubscriptionName = this.common.getUpdate().subscribe((IsUserLoggedIn: any) => {
      this.UserLogin = IsUserLoggedIn;
    });    
  }

  OnLogOutClicked()
  {
    this.auth.logout().subscribe((user: any) => {
      this.setUserLogin();
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.SubscriptionName.unsubscribe();
  }  

}
