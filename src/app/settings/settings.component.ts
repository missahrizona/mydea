import { AuthService } from 'src/app/services/auth.service';
import { SaveDarkMode } from './accessory/http-handlers';
import { GlobalsService } from './../services/globals.service';
import { HttpClient } from '@angular/common/http';
import { ThemeSwitcherService } from './../services/theme-switcher.service';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Toast } from 'primeng/toast';

import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  constructor(
    private themeSwitcher: ThemeSwitcherService,
    private http: HttpClient,
    private globals: GlobalsService,
    private toast: ToastController,
    public auth: AuthService,
    private anime: AnimationController
  ) {}

  aniEditImgBtn: Animation;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.aniEditImgBtn = this.anime
      .create()
      .addElement(this.editImgBtn.nativeElement)
      .duration(100)
      .keyframes([
        { offset: 0.5, opacity: 0.75 },
        { offset: 1, opacity: 0.5 },
      ]);
    this.editImgBtn.nativeElement.addEventListener('click', () => {
      this.aniEditImgBtn.play();
    });
  }

  @ViewChild('editImgBtn') editImgBtn: ElementRef;

  editimage(event: any) {}
}
