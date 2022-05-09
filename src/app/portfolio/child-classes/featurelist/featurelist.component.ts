import { AppAssistant } from './../AppAssistant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featurelist',
  templateUrl: './featurelist.component.html',
  styleUrls: ['../../portfolio.component.scss'],
})
export class FeaturelistComponent implements OnInit {
  constructor(public apps: AppAssistant) {}

  ngOnInit(): void {}
}
