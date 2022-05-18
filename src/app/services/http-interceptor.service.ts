import { Steps } from './../login/child-classes/LoginSteps';
import { User } from './../login/child-classes/User';
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
import * as moment from 'moment';

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
      let usr = localStorage.getItem('user');
      if (usr == null) {
        this.router.navigate(['/login']);
      } else {
        let u = JSON.parse(usr) as User;
        this.auth.user = new User(u.tel, u.displayname, moment(u.validatedon));

        let now = moment();
        let then = moment().subtract(7, 'days');

        if (!this.auth.user.validatedon?.isBetween(then, now)) {
          this.router.navigate(['/login']);
        } else {
          return next.handle(req);
        }
      }
    }
    return next.handle(req);
  }
}
