import { GlobalsService } from 'src/app/services/globals.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private g: GlobalsService) {}

  get(path: string): Observable<any> {
    return this.http.get(`${this.g.webapi}/${path}`);
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.g.webapi}/${path}`, body);
  }

  delete(path: string, options: any): Observable<any> {
    return this.http.delete(`${this.g.webapi}/${path}`, options);
  }
}
