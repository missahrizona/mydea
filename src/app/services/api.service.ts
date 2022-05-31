import { GlobalsService } from 'src/app/services/globals.service';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private g: GlobalsService,
    private httpBackendHandler: HttpBackend
  ) {
    this.httpBackend = new HttpClient(httpBackendHandler);
  }

  httpBackend: HttpClient;

  get(path: string): Observable<any> {
    // if (path.slice(0, 4) == 'auth') {
    //   return this.httpBackend.get(`${this.g.webapi}/${path}`);
    // }
    return this.http.get(`${this.g.webapi}/${path}`);
  }

  post(path: string, body: any): Observable<any> {
    // if (path.slice(0, 4) == 'auth') {
    //   return this.httpBackend.post(`${this.g.webapi}/${path}`, body);
    // }
    return this.http.post(`${this.g.webapi}/${path}`, body);
  }

  delete(path: string, options: any): Observable<any> {
    // if (path.slice(0, 4) == 'auth') {
    //   return this.httpBackend.delete(`${this.g.webapi}/${path}`, options);
    // }
    return this.http.delete(`${this.g.webapi}/${path}`, options);
  }
}
