import type Reporter from '../Reporter'
import loglevel from 'loglevel'

function proxyHistory(api: 'pushState' | 'replaceState') {
  const original = history[api]
  history[api] = function (this: History, ...args: Parameters<History[typeof api]>) {
    // 在这里可以添加代理逻辑，比如事件触发、日志记录等
    loglevel.info(`History.${api} called with:`, args)
    // 调用原始方法
    const result = original.apply(this, args)
    // 可以在这里触发自定义事件
    const event = new Event(api)
    window.dispatchEvent(event)
    return result
  }
}

proxyHistory('pushState')
proxyHistory('replaceState')

/**
 * 自动埋点，监听页面加载、页面浏览、页面离开、元素点击等事件
 */
export class AutoCollector {
  reporter: Reporter | null = null

  startTime = Date.now()

  /**
   * 初始化事件监听
   */
  public init(reporter: Reporter): void {
    this.reporter = reporter
    setTimeout(() => {
      this.onPageLoad()
      setTimeout(() => {
        this.onPageView()
      })
    })
    window.addEventListener('pushState', () => this.onPageChange())
    window.addEventListener('replaceState', () => this.onPageChange())
    window.addEventListener('popstate', () => this.onPageChange())
    document.addEventListener('click', e => this.onClick(e))
  }

  private onClick(e: MouseEvent) {
    const element = e.target as HTMLElement
    this.reporter?.track('$element_click', {
      element_id: element.id,
      element_class: element.className,
      element_content: element.textContent?.trim() || '',
      page_x: e.pageX,
      page_y: e.pageY,
    })
  }

  onPageLoad() {
    this.reporter?.track('$page_load', {})
  }

  onPageChange() {
    this.onPageLeave()
    setTimeout(() => {
      this.onPageView()
    }, 16)
  }

  onPageView() {
    this.startTime = Date.now()
    this.reporter?.track('$page_view', {
      view_position: window.scrollY + window.innerHeight,
    })
  }

  onPageLeave() {
    this.reporter?.track('$page_leave', {
      duration: Date.now() - this.startTime,
      view_position: window.scrollY + window.innerHeight,
    })
  }
}
