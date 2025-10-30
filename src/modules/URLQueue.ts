export class URLQueue {
  private queue: string[] = []
  private maxLength = 10

  /**
   * 判断两个URL是否相同，忽略查询参数
   * @param url1 URL1
   * @param url2 URL2
   * @returns 是否相同
   */
  isSameUrl(url1: string, url2: string) {
    const url1Obj = new URL(url1)
    const url2Obj = new URL(url2)
    return url1Obj.origin === url2Obj.origin && url1Obj.pathname === url2Obj.pathname
  }

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
    if (this.isSameUrl(this.top(), url)) {
      return false
    }
    if (this.queue.length >= this.maxLength) {
      this.queue.shift()
    }
    this.queue.push(url)
    return true
  }
}
