export interface ITimer {
  timer: NodeJS.Timeout | undefined;
  seconds: number;
  init(): void;
  break(): void;
  getSeconds(): number;
  getMilliSeconds(): number;
}

export default class Timer implements ITimer {
  timer: NodeJS.Timeout | undefined = undefined;
  seconds = 0;

  constructor() {
    this.init();
  }

  init() {
    this.timer = setInterval(() => {
      this.seconds += 0.1;
    }, 100);
  }

  break() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  getSeconds() {
    return parseFloat(this.seconds.toFixed(2));
  }

  getMilliSeconds() {
    const milliSeconds = this.seconds * 1000;
    return Math.floor(milliSeconds);
  }
}
