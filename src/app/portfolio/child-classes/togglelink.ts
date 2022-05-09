import { AppAssistant } from './AppAssistant';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'toggle-link',
  template: `<div [style]="this.styles[verb]">
    <ion-button (click)="clicked()" fill="clear" size="small">
      <span>{{
        verb == 'add'
          ? apps.addingFeatures
            ? 'Done'
            : 'Add'
          : apps.editingFeatures
          ? 'Done'
          : 'Edit'
      }}</span>
    </ion-button>
  </div>`,
})
export class ToggleLink {
  constructor(public apps: AppAssistant) {}

  @Input('verb') verb: string;
  styles: any = {
    add: {
      position: 'absolute',
      top: '0',
      right: '0',
      padding: '5px 5px 0 0',
    },
    edit: {
      position: 'absolute',
      top: '0',
      left: '0',
      padding: '5px 0 0 5px',
    },
  };

  clicked() {
    if (this.verb == 'add') {
      this.apps.addingFeatures = !this.apps.addingFeatures;
    } else {
      this.apps.editingFeatures = !this.apps.editingFeatures;
    }
  }
}
