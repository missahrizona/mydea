import { Router } from '@angular/router';
import { GlobalsService } from './globals.service';
import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    public globals: GlobalsService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.indexOf(this.globals.webapi) != -1 &&
      req.url.indexOf('auth') == -1
    ) {
      //let usr = localStorage.getItem('user');
      // if (this.auth.user && !this.auth.user.authenticated) {
      //   this.router.navigate(['/login']);
      // }
      // else {
      //   let u = JSON.parse(usr) as User;
      //   this.api.post('auth/user', u).subscribe((userdata: UserData) => {
      //     this.auth.setUser(userdata);
      //   });
      //   if (!u.authenticated) {
      //     this.router.navigate(['/login']);
      //   } else {
      //     return next.handle(req);
      //   }
      // }
    }
    return next.handle(req);
  }
}
