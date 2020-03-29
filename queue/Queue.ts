class Queue<T> {
  dataStore: T[];

  constructor(dataStore?: T[]) {
    this.dataStore = dataStore || [];
  }

  get length() {
    return this.dataStore.length;
  }

  enqueue(element: T) {
    this.dataStore.push(element);
  }

  dequeue() {
    return this.dataStore.shift();
  }

  // 큐의 앞부분의 요소를 확인한다.
  front() {
    return this.dataStore[0];
  }

  // 큐의 끝부분의 요소를 확인한다.
  back() {
    return this.dataStore[this.dataStore.length - 1];
  }

  toString() {
    return this.dataStore.join("\n");
  }

  // 큐가 비었는지 안비었는지 확인한다.
  empty() {
    if (this.dataStore.length === 0) return true;
    return false;
  }

  [Symbol.iterator]() {
    let position = -1;
    const dataList = this.dataStore;
    const length = this.length;
    return {
      next() {
        position = position + 1;
        return {
          value: dataList[position],
          done: position >= length
        };
      }
    };
  }
}
