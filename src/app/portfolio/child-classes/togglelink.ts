import { AppAssistant } from './AppAssistant';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'toggle-link',
  template: `<div [style]="this.styles[verb]">
    <ion-button
      [disabled]="
        verb == 'edit'
          ? apps.features.adding
          : apps.features.saving || apps.features.editing
      "
      (click)="clicked()"
      fill="clear"
      size="small"
    >
      <span>{{
        verb == 'add'
          ? apps.features.adding
            ? 'Done'
            : 'Add'
          : apps.features.editing
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
      this.apps.features.adding = !this.apps.features.adding;
    } else {
      this.apps.features.editing = !this.apps.features.editing;
    }
  }
}
