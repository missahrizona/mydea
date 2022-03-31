class StartupApp {
  name?: string;
  description?: string;
  founder?: string;
  features: string[];
  timeline: AppTimeline[];

  constructor() {
    this.features = [];
    this.timeline = [];
  }

  static getDefaultTimeline(): AppTimeline[] {
    return [
      { status: 'Minimum Viable Product', isProgress: false, isDone: false },
      { status: 'User Growth', isProgress: false, isDone: false },
      { status: 'Revenue', isProgress: false, isDone: false },
      { status: 'Profitability', isProgress: false, isDone: false },
    ];
  }
}

class AppTimeline {
  status?: string;
  isDone: boolean = false;
  isProgress: boolean = false;
}

export { StartupApp, AppTimeline };
