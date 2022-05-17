import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public globals: GlobalsService,
    public toast: ToastController,
    private router: Router
  ) {}

  userIsAuthenticated: boolean = false;
  creatinginprogress: boolean = false;
  verifyingcode: boolean = false;
  code: number;
  tel: string = '';
  displayname: string = '';
  loginstep: number = 0;
  msg: any = null;

  createaccount(): void {
    this.http
      .post(`${this.globals.webapi}/auth/createaccount`, {
        tel: this.tel,
        displayname: this.displayname,
      })
      .subscribe((res) => {
        this.loginstep = 3;
      });
  }

  accountexists(): void {
    this.http
      .post(`${this.globals.webapi}/auth/exists`, {
        tel: this.tel,
        displayname: this.displayname,
      })
      .subscribe(async (res) => {
        if (res == null) {
          // account doesnt exist
          this.loginstep = 2;
        } else {
          this.loginstep = 3;
        }
      });
  }

  codechanged(event: any) {
    if (this.msg.code == this.code) {
      this.accountexists();
    } else {
      this.toast.create({
        message: 'Incorrect code, pls try again',
        duration: 2000,
        position: 'bottom',
        translucent: true,
        animated: true,
        icon: 'alert-outline',
        color: 'warning',
      });
    }

    // verify code matches
  }

  requestcode(): void {
    this.loginstep = 1;
    this.http
      .post(`${this.globals.webapi}/auth/requestcode`, {
        tel: this.tel,
      })
      .subscribe((res) => {
        this.msg = res;
      });
    // request code
  }

  getstarted() {
    this.userIsAuthenticated = true;
    this.router.navigate(['home']);
  }
}
