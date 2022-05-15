import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { GlobalsService } from './../services/globals.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import * as _ from 'lodash';

import { App } from './child-classes/App';
import { Container } from 'tsparticles';
import TextParticlesOptions from './child-classes/TextParticlesOptions';

import { IonFab, ToastController } from '@ionic/angular';
import { AppAssistant } from './child-classes/AppAssistant';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  constructor(
    private messenger: MessageService,
    private http: HttpClient,
    public globals: GlobalsService,
    public themeService: ThemeSwitcherService,
    public toast: ToastController,
    public apps: AppAssistant
  ) {}

  @ViewChild('slide1', { read: ElementRef }) slide1: ElementRef;
  @ViewChild('slide2', { read: ElementRef }) slide2: ElementRef;
  @ViewChild('slide3', { read: ElementRef }) slide3: ElementRef;
  @ViewChild('refresher', { read: ElementRef }) refresher: ElementRef;

  fab: HTMLIonFabElement;

  ngOnInit(): void {
    // get all apps from monogdb
    this.apps.refresh();
  }
  ngAfterViewInit(): void {
    this.fab = document.getElementById('fab') as HTMLIonFabElement;
  }

  getSize(element: any) {
    element.style.maxHeight =
      element.style.maxHeight == '1000px' ? '0px' : '1000px';
  }

  screenClicked(event: any) {
    this.apps.deleting = false;
    if (this.fab != null) this.fab.close();
  }
}
