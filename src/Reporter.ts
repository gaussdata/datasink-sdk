import loglevel from 'loglevel'
import { AutoEventCollector } from './modules/AutoEventCollector'
import { Config } from './modules/Config'
import { EventData } from './modules/EventData'
import { Queue } from './modules/Queue'

export default class Reporter {
  private static instance: Reporter

  private readonly queue: Queue<EventData>

  private readonly maxQueueSize: number = 1000

  private timer = 0

  private consumeFn = () => this.consume()

  private isConsuming: boolean = false

  private url = '/t'

  private constructor() {
    this.queue = new Queue<EventData>(this.maxQueueSize)
    this.timer = setInterval(this.consumeFn, 1000)
    window.addEventListener('beforeunload', this.consumeFn)
    new AutoEventCollector().init(this)
  }

  static getInstance() {
    if (!Reporter.instance) {
      Reporter.instance = new Reporter()
    }
    return Reporter.instance
  }

  static setUrl(url: string) {
    this.getInstance().url = url
  }

  static setDebug(debug: boolean) {
    Config.debug = debug
  }

  public track(code: string, data: Record<string, string | number | boolean>) {
    if (window.doNotTrack || navigator.doNotTrack) {
      return
    }
    const event = new EventData(code, data)
    this.queue.enqueue(event)
  }

  /**
   * 消费队列数据，每10条合并为一个数组
   * 每个批次最多10条数据
   */
  private consume(): void {
    if (this.isConsuming || this.queue.isEmpty()) {
      return
    }

    this.isConsuming = true
    try {
      const batchSize = 10
      const batches: EventData[][] = []
      let currentBatch: EventData[] = []

      while (!this.queue.isEmpty()) {
        const event = this.queue.dequeue()
        if (event) {
          currentBatch.push(event)

          // 每10条组成一个批次
          if (currentBatch.length === batchSize) {
            batches.push(currentBatch)
            currentBatch = []
          }
        }
      }

      // 添加剩余不足10条的批次
      if (currentBatch.length > 0) {
        batches.push(currentBatch)
      }

      // 处理所有批次数据
      this.processBatches(batches)
    }
    finally {
      this.isConsuming = false
    }
  }

  /**
   * 处理批次数据（示例方法，需根据实际需求实现）
   * @param batches 二维事件数组
   */
  private processBatches(batches: EventData[][]): void {
    batches.forEach((batch, index) => {
      if (Config.debug) {
        loglevel.info(`Processing batch ${index + 1} with ${batch.length} events`)
      }
      const data = batch.map(EventData.toJson)
      navigator.sendBeacon(this.url, JSON.stringify(data))
    })
  }

  public destroy(): void {
    this.consumeFn()
    clearInterval(this.timer)
    window.removeEventListener('beforeunload', this.consumeFn)
  }
}
