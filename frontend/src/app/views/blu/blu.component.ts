import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-blu',
  templateUrl: './blu.component.html',
  styleUrls: ['./blu.component.scss']
})

export class BluComponent implements OnInit {

  ContactList!: any[];
  Chats!: any[];
  Messages!: any[];

  SelectedChat!: any;
  Chat!: any;

  User!: any;

  socket = io();

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('user'))
    {
      this.User = JSON.parse(localStorage.getItem('user') || '');
    }

    this.getAllChats();

    this.route.params.subscribe((params: Params) => {
      if(params.id)
      {
        this.SelectedChat = params.id;
        this.getAllMessages(params.id);
        this.getChatByID(params.id);
      }
    });

    this.getNewMessages();
    
  }

  getAllChats()
  {
    this.chatService.getAllChats().subscribe((chats: any) => {
      if(chats)
      {
        this.Chats = chats;
        console.log(chats);

        this.Chats = this.Chats.filter(chat => (chat.user._id === this.User._id) || (chat.contact._id === this.User._id));        
      }
    });

  }

  getChatByID(id: string)
  {
    this.chatService.getChatByID(id).subscribe((chat: any) => {
      this.Chat = chat;
    });    
  }

  getAllMessages(id: string)
  {
    this.chatService.getAllMessages().subscribe((messages: any) => {
      this.Messages = messages;

      this.Messages = this.Messages.filter(message => (message.sender._id === this.User._id || message.receiver._id === this.User._id) && message.chat._id === id);
    });
  }

  sendMessage(message: string)
  {
    this.chatService.sendMessage(this.User._id, this.Chat.contact._id, message, this.Chat._id).subscribe(message => {
      this.socket.emit('save-message', `Message - Sent by: ${this.User._id}`);
      this.ngOnInit();
    });
  }

  getNewMessages()
  {
    this.socket.on('new-message', () => {
      this.getAllMessages(this.Chat._id);
    });
  }

}
