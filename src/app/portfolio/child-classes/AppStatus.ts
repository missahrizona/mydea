export class FeatureStatus {
  constructor() {}

  deleting: any = {};
  saving: boolean = false;
  editing: boolean = false;
  adding: boolean = false;
}

export class ViewStatus {
  constructor() {}

  fab: boolean = false;
  deleteapp: boolean = false;
  appdetail: boolean = false;
  newapp: boolean = false;
  isSidebarOpen: boolean = false;
  newfeature: boolean = false;
}
