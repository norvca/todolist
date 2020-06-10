class Pubsub {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => {
        fn(data);
      });
    }
  }
}

const pubsub = new Pubsub();
export default pubsub;
