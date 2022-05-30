import { DispatcherService } from './../services/dispatcher.service';
import { ApiService } from './../services/api.service';
import { FotoService } from './../services/foto.service';
import { AuthService } from 'src/app/services/auth.service';

import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';

import { Animation, AnimationController } from '@ionic/angular';
import * as _ from 'lodash';
import { GlobalsService } from '../services/globals.service';
import { Photo } from '@capacitor/camera';
import { UserData } from '../login/child-classes/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public globals: GlobalsService,
    public foto: FotoService,
    public api: ApiService,
    public d: DispatcherService
  ) {
    this.pfp = 'url(../../assets/svg/avatar.svg)';
  }
  @ViewChild('profileImg') profileImg: ElementRef<HTMLImageElement>;

  //bgs: number[][] = _.chunk(Array.from(new Array(16).keys()), 3);
  bgs: number[] = Array.from(new Array(16).keys());
  bgImage: string = 'url(../../assets/images/bg-1.jpg)';
  pfp: string = 'url(../../assets/svg/avatar.svg)';

  ngOnInit(): void {
    this.d.user$.subscribe((user: UserData) => {
      if (user.settings != undefined && user.settings.pfp) {
        this.pfp = user.settings.pfp;
      }
    });
  }

  setBackgroundImage(idx: number) {
    this.api
      .post('settings/save', {
        user: this.auth.user,
        settings: { bgindex: idx + 1 },
      })
      .subscribe();
    this.globals.backgroundImage$.next(
      `url(../assets/images/backgrounds/bg-${idx + 1}.jpg)`
    );
  }

  formatBgImgCss(i: number) {
    let str = `url('../../assets/images/backgrounds/bg-${i + 1}.jpg')`;
    return str;
  }

  async takePicture() {
    const image: Photo = await this.foto.capture();

    this.saveProfilePic(image);
  }

  saveProfilePic(image: Photo) {
    this.auth.user.settings.pfp = image.dataUrl;
    this.pfp = image.dataUrl || '';

    this.api
      .post('settings/save', {
        user: this.auth.user,
        settings: { pfp: image.dataUrl },
      })
      .subscribe();
  }
}
