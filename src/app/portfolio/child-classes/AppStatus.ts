import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class AppStatus {
  constructor() {}

  features: FeatureStatus;
}

export class FeatureStatus {
  constructor() {}

  deleting: any = {};
  saving: boolean = false;
  editing: boolean = false;
  adding: boolean = false;
}
