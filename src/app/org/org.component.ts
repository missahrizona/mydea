import { Component, OnInit } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css'],
})
export class OrgComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.orgdata = [
      {
        label: 'Lily',
        expanded: true,
        children: [
          {
            label: 'Maria',
            expanded: true,
          },
          {
            label: 'Marcus',
            expanded: true,
          },
        ],
      },
    ];
  }

  orgdata: TreeNode[] = [];
}
