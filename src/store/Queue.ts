export class Queue {
  private set = new Set<number>();
  private arr: number[] = [];

  push(id: number) {
    this.set.add(id);
    this.arr.push(id);
  }

  pop(): number {
    const id: number = this.arr.pop()!;

    this.set.delete(id);

    return id;
  }

  has(id: number) {
    return this.set.has(id);
  }

  get size(): number {
    return this.arr.length;
  }
}
