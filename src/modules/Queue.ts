/**
 * 队列(Queue)实现 - 先进先出(FIFO)数据结构
 */
export class Queue<T> {

  private maxLength = 1000;
  private items: T[];

  constructor(maxLength: number) {
    this.maxLength = maxLength;
    this.items = [];
  }

  /**
   * 向队列尾部添加一个元素
   * @param element 要添加的元素
   */
  enqueue(element: T): void {
    if (this.items.length > this.maxLength) {
        this.dequeue();
    }
    this.items.push(element);
  }

  /**
   * 移除队列头部的元素并返回
   * @returns 队列头部的元素，如果队列为空则返回undefined
   */
  dequeue(): T | undefined {
    return this.items.shift();
  }

  /**
   * 返回队列头部的元素，但不移除
   * @returns 队列头部的元素，如果队列为空则返回undefined
   */
  peek(): T | undefined {
    return this.items[0];
  }

  /**
   * 检查队列是否为空
   * @returns 如果队列为空返回true，否则返回false
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * 返回队列中元素的数量
   * @returns 队列中元素的数量
   */
  size(): number {
    return this.items.length;
  }

  /**
   * 清空队列
   */
  clear(): void {
    this.items = [];
  }

  /**
   * 返回队列的字符串表示
   * @returns 队列的字符串表示
   */
  toString(): string {
    return this.items.toString();
  }
}