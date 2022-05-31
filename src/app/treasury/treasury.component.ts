import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.scss'],
})
export class TreasuryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  cards: any[] = [
    {
      name: 'Microsoft Office',
      link: 'https://www.office.com/',
      img: '../../assets/images/cards/office.png',
    },
    {
      name: 'Adobe Creative Cloud',
      link: 'https://creativecloud.adobe.com/',
      img: '../../assets/images/cards/adobe.png',
    },
    {
      name: 'MIT Professional Certificate in Coding for Women',
      link: 'https://executive-ed.xpro.mit.edu/professional-certificate-coding-womens-cohort',
      img: '../../assets/images/cards/mit.png',
    },
  ];

  slideChanged(event: any) {}
}
