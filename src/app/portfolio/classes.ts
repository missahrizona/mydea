class App {
  constructor() {}

  _id?: any;
  name: string = '';
  description: string = '';
  originator: string = '';
  collaborators: string[] = [];
  features: string[] = [];
  timeline: Timeline = new Timeline();
  initiated: boolean = false;
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
