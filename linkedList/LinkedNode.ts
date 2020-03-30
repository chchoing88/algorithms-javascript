class LinkedNode<T> {
  element: T;
  next: LinkedNode<T> | null;
  previous: LinkedNode<T> | null;

  constructor(element: T) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}
