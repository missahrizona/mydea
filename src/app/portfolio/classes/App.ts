import * as _ from 'lodash';

class App {
  constructor(
    name: string = '',
    originator: string = '',
    features: string[] = []
  ) {
    this.name = name || '';
    this.originator = originator || '';
    this.features = features;
    this._id = undefined;
  }

  _id?: any;
  name: string = '';
  description: string = '';
  originator: string = '';
  collaborators: string[] = [];
  features: string[] = [];
  timeline: Timeline = new Timeline();
  initiated: boolean = false;
  deleting: boolean = false;
}

class Timeline extends Array {
  constructor() {
    super();
    return new Array(
      {
        description: 'MVP',
        isDone: false,
        inProgress: false,
      },
      {
        description: 'Growth',
        isDone: false,
        inProgress: false,
      },
      {
        description: 'Revenue',
        isDone: false,
        inProgress: false,
      },
      {
        description: 'Profit',
        isDone: false,
        inProgress: false,
      }
    );
  }
}

export { App, Timeline };
