import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private webRequest: WebRequestService) { }

  /*** USERS */

  /* Add new User */
  createUser(name: string, username: string, description:string, password: string)
  {
    return this.webRequest.post('api/users/register', {name, username, description, password});
  }

  /* get all Users */

  getAllUsers()
  {
    return this.webRequest.get('api/users/all');
  }  

  /* get all Users */

  getUserByID(id: string)
  {
    return this.webRequest.get(`api/users/${id}`);
  }


  /* update user */

  updateUser(id: string, name: string, username: string, description:string)
  {
    return this.webRequest.patch(`api/users/${id}`, {name, username, description});
  }

  /* delete User */

  deleteUser(id: string)
  {
    return this.webRequest.delete(`api/users/${id}`);
  }


  /*** Messages */

  /* Send A new Message */

  sendMessage(sender: string, receiver:string, message:string, chat: string)
  {
    return this.webRequest.post('api/messages/new-message', {message, sender, receiver, chat});
  }

  /* Get All Message */

  getAllMessages()
  {
    return this.webRequest.get('api/messages/all');
  }

  /* Get Message BY ID */

  getMessageByID(id: string)
  {
    return this.webRequest.get(`api/messages/${id}`);
  }

  /*Update A Message */

  updateMessage(id: string, message: string)
  {
    return this.webRequest.patch(`api/messages/${id}`, {message});
  }

  /* Delete a Message */

  deleteMessage(id: string)
  {
    return this.webRequest.delete(`api/messages/${id}`);
  }
  

  /**** Contacts */

  /* Get Contact List */

  getContactList()
  {
    return this.webRequest.get('api/contacts/all');
  }

  /*Get Contact List By ID*/

  getContactListByID(id: string)
  {
    return this.webRequest.get(`api/contacts/${id}`);
  }

  /* Create New Contact List For User */
  newContactList(user:string, contactlist: string[] )
  {
    return this.webRequest.post('api/contacts/new-contact-list', {user, contactlist});
  }

  /* Create New Contact */

  addContact(id: string, contact: string)
  {
    return this.webRequest.patch(`api/contacts/${id}/new-contact`, {contact})
  }

  /* Delete Contact */

  removeContact(id: string, contact: string)
  {
    return this.webRequest.delete(`api/contacts/${id}/remove-friend/${contact}`);
  }

  /**  Chat */

  /* Get All Chats */

  getAllChats()
  {
    return this.webRequest.get('api/chats/all');
  }

  /* Get Chat By ID */

  getChatByID(id: string)
  {
    return this.webRequest.get(`api/chats/${id}`);
  }

  /* New Chat */

  addChat(user: string, contact: string)
  {
    return this.webRequest.post('api/chats/new-chat', {user, contact});
  }

}
