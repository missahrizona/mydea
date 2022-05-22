import { BehaviorSubject } from 'rxjs';
import { AppAssistant } from './../AppAssistant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featurelist',
  templateUrl: './featurelist.component.html',
  styleUrls: ['./featurelist.component.scss'],
})
export class FeaturelistComponent {
  constructor(public apps: AppAssistant) {}

  deleteLoading: any = {};

  addFeature(): any {
    this.apps.features.saving = true;
    let listener = new BehaviorSubject(false);
    this.apps.newFeatureSaved(listener);
    listener.subscribe((update) => {
      if (update) {
        this.apps.features.saving = false;
      }
    });
  }

  deleteFeature(feature: string) {
    this.deleteLoading[feature] = true;
    let listener = new BehaviorSubject(false);

    this.apps.deleteFeatureClicked(feature, listener);
    listener.subscribe((update) => {
      if (update) {
        this.deleteLoading[feature] = false;
        listener.unsubscribe();
      }
    });
  }
}
