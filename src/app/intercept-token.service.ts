import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterceptTokenService implements HttpInterceptor {

  constructor(private a: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      if (!request.url.includes("spotify.com")) {
          request = request.clone({
              setHeaders: {
                  Authorization: `JWT ${this.a.getToken()}`
              }
          });
      }
      return next.handle(request);
  }

}
