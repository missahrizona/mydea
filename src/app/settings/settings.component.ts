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
import * as _ from 'lodash';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    public auth: AuthService,
    private anime: AnimationController,
    public globals: GlobalsService
  ) {}
  @ViewChild('profileImg') profileImg: ElementRef;
  aniEditImgBtn: Animation;

  bgs: any[][] = _.chunk(Array.from(new Array(35).keys()), 6);

  async editimage(event: any) {
    await this.takePicture();
  }

  setBackgroundImage(idx: number) {
    this.globals.backgroundImage$.next(
      `url(../assets/images/bg-${idx + 1}.jpg)`
    );
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
    console.log(image);

    // Can be set to the src of an image now
    this.profileImg.nativeElement.src = imageUrl;
  };
}
