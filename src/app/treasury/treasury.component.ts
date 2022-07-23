import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.scss'],
})
export class TreasuryComponent implements OnInit {
  constructor(private http: HttpClient) {}

  accessKey: string = 'guFi2sERZWAns62fdRbA_WAGW_RTGlmntE2eQ4sv75w';

  ngOnInit(): void {
    let requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'Client-ID guFi2sERZWAns62fdRbA_WAGW_RTGlmntE2eQ4sv75w',
      }),
    };
    // this.cards.forEach(async (card) => {
    //   this.http
    //     .get(
    //       `https://api.unsplash.com/photos/random/?query=${card.name}&client_id=${this.accessKey}`,
    //       requestOptions
    //     )
    //     .subscribe((result: any) => {
    //       card.link = result.urls.small;
    //     });
    // });
  }

  cards: any[] = [
    {
      name: 'Microsoft Office',
      link: '',
      img: '../../assets/images/cards/office.png',
      user: 'missahrizona@outlook.com',
      pass: 'familypass123',
    },
    {
      name: 'Adobe Creative Cloud',
      link: '',
      img: '../../assets/images/cards/adobe.png',
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'MIT Professional Certificate in Coding for Women',
      link: '',
      img: '../../assets/images/cards/mit.png',
      request: true,
    },
    {
      name: 'Netflix',
      link: '',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Hulu',
      link: '',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Disney+',
      link: '',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'HBO Max',
      link: '',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Amazon Prime',
      link: '',
      iframe: true,
      user: 'markus.anthony.garcia@gmail.com',
      pass: 'familypass123',
    },
    {
      name: 'Youtube Premium',
      link: '',
      invite: true,
    },
    {
      name: 'Apple Game Pass',
      invite: true,
    },
    {
      name: 'Xbox GamePass for PC',
      link: '',
      invite: true,
    },
    {
      name: 'Playstation Plus',
      link: '',
      invite: true,
    },
    {
      name: 'EA Play Pro',
      link: '',
      invite: true,
    },
    {
      name: 'Apple TV+',
      link: '',
      invite: true,
    },
    {
      name: 'Spotify',
      link: '',
      invite: true,
    },
    {
      name: 'Google One',
      link: '',
      invite: true,
    },
  ];

  slideChanged(event: any) {}
}
