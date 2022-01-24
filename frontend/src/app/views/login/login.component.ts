import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private common: CommonService) { }

  ngOnInit(): void {
  }

  OnLoginClicked(username: string, password: string)
  {
    this.auth.userLogin(username, password).subscribe((user: any) => {
      this.router.navigate(['/blu-chat']);
      this.common.sendUpdate(true);
    })
  }
}
