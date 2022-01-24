import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  OnRegisterClicked(name: string, username: string, description: string, password: string)
  {
    this.auth.userRegister(name, username, description, password).subscribe((user:any) => {
      this.chatService.newContactList(user._id, ['']).subscribe((contactList: any) => {
        this.router.navigate(['/login']);
      });
    });
  }

}
