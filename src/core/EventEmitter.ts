type EventCallback = (...args: any[]) => void;

export class EventEmitter {
  private static instance: EventEmitter;
  private eventMap: Record<string, EventCallback[]> = {};

  private constructor() {}

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

  public on(eventType: string, callback: EventCallback): void {
    if (!this.eventMap[eventType]) {
      this.eventMap[eventType] = [];
    }
    this.eventMap[eventType].push(callback);
  }

  public off(eventType: string, callback: EventCallback): void {
    const callbacks = this.eventMap[eventType];
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  public emit(eventType: string, ...args: any[]): void {
    const callbacks = this.eventMap[eventType];
    if (callbacks) {
      for (const callback of callbacks) {
        callback(...args);
      }
    }
  }
}
