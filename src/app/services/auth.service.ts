import { AppAssistant } from './../portfolio/child-classes/AppAssistant';
import { DispatcherService } from './dispatcher.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { LibService } from './lib.service';
import { ToastController } from '@ionic/angular';
import { GlobalsService } from './globals.service';
import { Injectable, OnInit } from '@angular/core';
import { User, UserData } from '../login/child-classes/User';
import { Steps } from '../login/child-classes/LoginSteps';
import { Coder } from '../login/child-classes/Coder';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public globals: GlobalsService,
    public toast: ToastController,
    public lib: LibService,
    private router: Router,
    private api: ApiService,
    private d: DispatcherService,
    private apps: AppAssistant
  ) {}

  creatinginprogress: boolean = false;
  verifyingcode: boolean = false;
  codes: string[] = ['', '', '', '', '', ''];
  loginstep: number = 0;
  msg: any = null;
  user: User = new User({});
  accountRequestLoading: boolean = false;

  codeprogress: Coder = new Coder();

  async initUser() {
    let usr = localStorage.getItem('user');
    if (usr != null) {
      let u = JSON.parse(usr) as User;
      let userdata: UserData = await firstValueFrom(
        this.api.post('auth/user', u)
      );
      this.setUser(userdata);
      if (this.user.authenticated) {
        this.tohome();
      } else {
        this.router.navigate(['/login']);
        this.loginstep = Steps.VERIFY_CODE;
        this.requestcode();
      }
    } else {
      this.router.navigate(['/login']);
      this.loginstep = Steps.INPUT_TEL;
    }
  }

  setUser(u: UserData) {
    this.user = new User(u);
    let then = this.lib.moment().subtract(7, 'days'),
      now = this.lib.moment();
    this.user.authenticated = this.user.validatedon?.isBetween(then, now);
    this.user.auth_date_diff = now.diff(this.lib.moment(this.user.validatedon));
    localStorage.setItem('user', JSON.stringify(this.user));
    let bgurl = `url(../assets/images/backgrounds/bg-${this.user.settings.bgindex}.jpg)`;
    this.globals.backgroundImage$.next(bgurl);
    this.d.user$.next(this.user);
  }

  fetchUser(u: User): Observable<any> {
    return this.api.post('auth/user', u);
  }

  requestcode(): void {
    this.loginstep = Steps.VERIFY_CODE;
    this.api
      .post('auth/requestcode', {
        tel: this.user.tel,
      })
      .subscribe((res: any) => {
        this.msg = res;
      });
    // request code
  }

  codeschanged(event: any) {
    if (this.codes.join('').length < 6) {
      return;
    } else {
      let progressbar = document.querySelector('.progress-bar') as HTMLElement;
      progressbar.style.opacity = '1';
      this.codeprogress.value = 0;
      this.codeprogress.interval = setInterval(
        (async () => {
          this.codeprogress.value += 0.1;
          if (this.codeprogress.value >= 1) {
            clearInterval(this.codeprogress.interval);
            if (this.msg.code == this.codes.join('')) {
              this.user.validatedon = this.lib.moment();
              this.api
                .post('auth/validated', {
                  _id: this.user._id,
                  validatedon: this.user.validatedon,
                })
                .subscribe();
              this.codeprogress.color = 'success';
              this.apps.refresh(false);
              if (this.user.displayname == '')
                this.loginstep = Steps.DISPLAY_NAME;
              else this.loginstep = Steps.GREETING;
            } else {
              this.codeprogress.color = 'danger';
              await this.toast.create({
                message: `Incorrect code, pls enter the code sent to ${this.user.tel}`,
                duration: 2000,
                position: 'bottom',
                translucent: true,
                animated: true,
                icon: 'alert-outline',
                color: 'warning',
              });
            }
          }
        }).bind(this),
        100
      );
    }
  }

  telsubmitted() {
    this.accountRequestLoading = true;
    this.accountexists();
  }

  accountexists(): void {
    this.api
      .post('auth/exists', {
        tel: this.user.tel,
      })
      .subscribe(async (res: any) => {
        this.accountRequestLoading = false;
        if (res == null) {
          // account doesnt exist
          this.requestcode();
        } else {
          this.setUser(res);
          if (this.user.authenticated) {
            this.loginstep = Steps.GREETING;
          } else {
            this.requestcode();
          }
        }
      });
  }

  createaccount(): void {
    this.creatinginprogress = true;
    let usr: User = new User({
      tel: this.user.tel,
      displayname: this.user.displayname,
      validatedon: this.lib.moment(),
    });
    this.api.post('auth/createaccount', usr).subscribe((res) => {
      if (res.acknowledged == true) {
        usr._id = res.insertedId;
        this.setUser(usr);
        this.loginstep = Steps.GREETING;
        this.creatinginprogress = false;
      }
    });
  }

  tohome() {
    this.apps.refresh();
    this.router.navigate(['home']);
  }
}
