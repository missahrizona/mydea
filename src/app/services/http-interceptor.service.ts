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
    if (req.url.indexOf(this.globals.webapi) != -1) {
      if (this.auth.userIsAuthenticated) {
        return next.handle(req);
      } else {
        this.router.navigate(['/login']);
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
