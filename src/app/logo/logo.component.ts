import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit, AfterViewInit {
  constructor() {}

  @Input('width') width: string;

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
