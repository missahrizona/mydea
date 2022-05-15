import { AppAssistant } from './../AppAssistant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab-contents',
  templateUrl: './fab-contents.component.html',
  styleUrls: ['./fab-contents.component.scss'],
})
export class FabContentsComponent implements OnInit {
  constructor(public apps: AppAssistant) {}

  ngOnInit(): void {}
}
