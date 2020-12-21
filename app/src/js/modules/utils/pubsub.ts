interface callbackFunc {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any): any;
}

interface eventsObj {
  [eventName: string]: callbackFunc[];
}

class Pubsub {
  private events: eventsObj;

  constructor() {
    this.events = {};
  }

  on(event: string, callback: callbackFunc) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  emit(event: string, data?: unknown) {
    if (this.events[event]) {
      this.events[event].forEach(fn => {
        fn(data);
      });
    }
  }
}

const pubsub = new Pubsub();
export default pubsub;
