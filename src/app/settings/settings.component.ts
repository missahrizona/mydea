import { AuthService } from 'src/app/services/auth.service';

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  constructor(public auth: AuthService, private anime: AnimationController) {}

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
