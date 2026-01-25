export class Queue {
  items: number[];

  constructor() {
    this.items = [];
  }

  enqueue(value: number) {
    this.items.push(value);
  }

  dequeue() {
    if (this.items.length === 0) return null;
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
}
