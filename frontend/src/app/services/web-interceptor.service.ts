import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebInterceptorService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
      // console.log("interceptor: " + req.url);
      req = req.clone({
        withCredentials: true
      });
      
      return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
        if(error.status === 401)
        {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }));
    }
}
