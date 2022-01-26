import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private subjectName = new Subject<any>(); //need to create a subject

  sendUpdate(IsLoggedIn: boolean) { //the component that wants to update something, calls this fn
      this.subjectName.next({ UserIsLoggedIn: IsLoggedIn }); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
      return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }  
}
