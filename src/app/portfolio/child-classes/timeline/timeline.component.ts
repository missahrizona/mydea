import { AppAssistant } from './../AppAssistant';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { App } from '../App';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(public apps: AppAssistant) {}

  @Input('static') static: boolean = false;
  @Input('animate') animate: boolean = false;

  app: App = new App();

  ngOnInit(): void {
    this.app = this.static ? this.apps.stagingApp : this.apps.selected;
  }

  untouched(event: any, i: number): boolean {
    return (
      !event.isDone &&
      !event.inProgress &&
      (i == 0 || this.app.timeline[i - 1].isDone)
    );
  }

  reverse(event: any, i: number): boolean {
    return i % 2 != 0 && (this.untouched(event, i) || event.inProgress);
  }

  getAnimation(index: number): string {
    let str = this.animate ? `bounce-in-fwd 1.1s ${0.6 + 1.5 * index}s` : '';

    return str;
  }
}
