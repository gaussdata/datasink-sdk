export class URLQueue {
  private queue: string[] = []
  private maxLength = 10

  top() {
    if (this.queue.length === 0) {
      return ''
    }
    return this.queue[this.queue.length - 1]
  }

  second() {
    if (this.queue.length < 2) {
      return ''
    }
    return this.queue[this.queue.length - 2]
  }

  enqueue(url: string) {
    if (this.top() === url) {
      return false
    }
    if (this.queue.length >= this.maxLength) {
      this.queue.shift()
    }
    this.queue.push(url)
    return true
  }
}
