import { AppAssistant } from './../AppAssistant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(public apps: AppAssistant) {}

  ngOnInit(): void {}

  untouched(event: any, i: number): boolean {
    return (
      !event.isDone &&
      !event.inProgress &&
      (i == 0 || this.apps.selected.timeline[i - 1].isDone)
    );
  }

  reverse(event: any, i: number): boolean {
    return i % 2 != 0 && (this.untouched(event, i) || event.inProgress);
  }
}
