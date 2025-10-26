import type Reporter from '../Reporter'
import { snapToGrid } from '../utils'
import { URLQueue } from './URLQueue'

function proxyHistory(api: 'pushState' | 'replaceState') {
  const original = history[api]
  history[api] = function (this: History, ...args: Parameters<History[typeof api]>) {
    const result = original.apply(this, args)
    const event = new Event(api)
    window.dispatchEvent(event)
    return result
  }
}

proxyHistory('pushState')
proxyHistory('replaceState')

function onLoad(callback: () => void) {
  if (document.readyState === 'complete') {
    callback()
  }
  else {
    window.addEventListener('load', callback)
  }
}

function onView(callback: () => void) {
  if (document.readyState === 'complete') {
    callback()
  }
  else {
    window.addEventListener('pageshow', callback)
  }
}

function onUnload(callback: () => void) {
  window.addEventListener('unload', callback)
}

/**
 * 自动埋点，监听页面加载、页面浏览、页面离开、元素点击等事件
 */
export class AutoEventCollector {
  reporter: Reporter | null = null
  startTime = Date.now()
  duration = 0
  lastScrollTime = Date.now()
  urlQueue = new URLQueue()

  /**
   * 初始化事件监听
   */
  public init(reporter: Reporter): void {
    this.reporter = reporter
    onLoad(() => this.onPageLoad())
    onView(() => {
      this.onPageView()
      window.addEventListener('pushState', () => this.onPageChange())
      window.addEventListener('replaceState', () => this.onPageChange())
      window.addEventListener('popstate', () => this.onPageChange())
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.onPageVisible()
        }
        else if (document.visibilityState === 'hidden') {
          this.onPageHidden()
        }
      })
    })
    onUnload(() => this.onPageLeave())
    document.addEventListener('click', e => this.onClick(e))
    document.addEventListener('scroll', () => this.onScroll())
  }

  private onScroll() {
    const now = Date.now()
    if (now - this.lastScrollTime >= 1000) {
      this.lastScrollTime = now
      this.reporter?.track('$scroll', {
        scroll_position: window.scrollY + window.innerHeight,
      })
    }
  }

  private onClick(e: MouseEvent) {
    const element = e.target as HTMLElement
    this.reporter?.track('$element_click', {
      element_id: element.id,
      element_class: element.className,
      element_content: element.textContent?.trim() || '',
      page_x: snapToGrid(e.pageX, 10),
      page_y: snapToGrid(e.pageY, 10),
    })
  }

  private onPageLoad() {
    this.reporter?.track('$page_load', {})
  }

  private onPageChange() {
    setTimeout(() => {
      // 等待浏览器更新 URL 后再记录页面离开事件
      // 避免记录到相同的 URL
      if (this.urlQueue.enqueue(location.href)) {
        this.onPageLeave(this.urlQueue.second())
        this.onPageView()
      }
    }, 16)
  }

  private onPageView() {
    this.startTime = Date.now()
    this.urlQueue.enqueue(location.href)
    this.reporter?.track('$page_view', {
      view_position: window.scrollY + window.innerHeight,
    })
  }

  private onPageVisible() {
    this.startTime = Date.now()
  }

  private onPageHidden() {
    const interval = Date.now() - this.startTime
    this.duration += interval
  }

  private onPageLeave(url?: string) {
    const interval = Date.now() - this.startTime
    this.duration += interval
    this.reporter?.track('$page_leave', {
      url: url || location.href,
      duration: this.duration,
      view_position: window.scrollY + window.innerHeight,
    })
  }
}
