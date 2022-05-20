import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';

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
  @ViewChild('editImgBtn') editImgBtn: ElementRef;
  @ViewChild('profileImg') profileImg: ElementRef;
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

  async editimage(event: any) {
    await this.takePicture();
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    this.profileImg.nativeElement.src = imageUrl;
  };
}
