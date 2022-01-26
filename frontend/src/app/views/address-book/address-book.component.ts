import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {


  User!: any;
  AllUsers!: any[];

  ContactList!: any[];
  Temp!: any[];

  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user'))
    {
      this.User = JSON.parse(localStorage.getItem('user') || '');
    }

    this.getAllUsers();
    this.getFriends();
  }

  getAllUsers()
  {
    this.chatService.getAllUsers().subscribe((users: any) => {
      this.AllUsers = users;
    });
  }

  getFriends()
  {
    this.chatService.getContactList().subscribe((friends: any) => {
      this.ContactList = friends;

      this.ContactList = this.ContactList.filter(contacts => contacts.user._id === this.User._id);
      this.Temp = this.ContactList[0].contactList;
    });
  }

  SearchForFriends(input: string)
  {
    this.Temp = [];

    this.ContactList[0].contactList.forEach((element: any) => {
      if(element.name.includes(input))
      {
        this.Temp.push(element);
      }
    });
  }

  addFriend(id: string)
  {
    this.chatService.addContact(this.ContactList[0]._id, id).subscribe((contact: any) => {
      this.ngOnInit();
    });
  }

  removeFriend(id: string)
  {
    this.chatService.removeContact(this.ContactList[0]._id, id).subscribe((contact: any) => {
      this.ngOnInit();
    });
  }

  startChat(id: string)
  {
    this.chatService.addChat(this.User._id, id).subscribe(chat => {
      this.router.navigate(['/blu-chat']);
    });
  }

}
