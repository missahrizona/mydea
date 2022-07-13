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
      user: 'missahrizona@outlook.com',
      pass: 'familypass123'
    },
    {
      name: 'Adobe Creative Cloud',
      link: 'https://creativecloud.adobe.com/',
      img: '../../assets/images/cards/adobe.png',
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123'
    },
    {
      name: 'MIT Professional Certificate in Coding for Women',
      link: 'https://executive-ed.xpro.mit.edu/professional-certificate-coding-womens-cohort',
      img: '../../assets/images/cards/mit.png',
      request: true
    },
    {
      name: 'Netflix',
      link: 'https://netflix.com',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Hulu',
      link: 'https://hulu.com',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Disney+',
      link: 'https://disneyplus.com',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'HBO Max',
      link: 'https://hbomax.com',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Amazon Prime',
      link: 'https://amazon.com',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Youtube Premium',
      link: 'https://youtube.com',
      invite: true
    },
    {
      name: 'Apple Game Pass',
      invite: true
    },
    {
      name: 'Xbox GamePass for PC',
      link: 'https://www.xbox.com/en-US/xbox-game-pass/pc-game-pass',
      invite: true
    },
    {
      name: 'Playstation Plus',
      link: '',
      invite: true
    },
    {
      name: 'EA Play Pro',
      link: 'https://www.ea.com/ea-play',
      invite: true
    },
    {
      name: 'Apple TV+',
      link: 'https://tv.apple.com',
      invite: true
    },
    {
      name: 'Spotify',
      link: 'https://spotify.com',
      invite: true
    },
    {
      name: 'Google One',
      link: 'https://families.google.com',
      invite: true
    }
  ];

  slideChanged(event: any) {}
}
