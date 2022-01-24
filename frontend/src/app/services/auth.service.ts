import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { CommonService } from './common.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private webReqService: WebRequestService, private router: Router, private common: CommonService) { }

  userRegister(name: string, username: string, description: string, password: string)
  {
    return this.webReqService.post('api/users/register', {name, username, description, password});
  }

  userLogin(username: string, password: string)
  {
    return this.webReqService.login(username, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.storeUserData(res.body);
      })
    );
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.common.sendUpdate(false);
    return this.webReqService.post('api/users/logout', {});
  }

  getUserByUsername(username: string)
  {
    return this.webReqService.get(`api/users/username/${username}`);
  }

  storeUserData(user: any)
  {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
