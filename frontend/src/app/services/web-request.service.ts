import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient)
  {

    this.ROOT_URL = 'http://localhost:3000';

    //this.ROOT_URL = '';
    
  }

  get(uri: string)
  {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object)
  {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object)
  {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string)
  {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/api/users/login`, {
      username,
      password
    }, {
        observe: 'response',
        withCredentials: true
      });
  }

  singup(name:string, username: string, description: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/api/users/register`, {
      name,
      username,
      description,
      password
    }, {
        observe: 'response'
      });
  }
  
}
