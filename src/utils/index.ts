export function proxyHistory(api: 'pushState' | 'replaceState') {
  const original = history[api]
  history[api] = function (this: History, ...args: Parameters<History[typeof api]>) {
    const result = original.apply(this, args)
    const event = new Event(api)
    window.dispatchEvent(event)
    return result
  }
}

/**
 * 对数值进行网格对齐
 * @param value
 * @param gridSize 网格大小
 * @returns 对齐后的数值
 */
export function snapToGrid(value: number, gridSize: number) {
  return Math.round(value / gridSize) * gridSize
}

/**
 * 获取页面加载时间
 * @returns 页面加载时间
 */
export function getPageDuration() {
  const [pnt] = performance.getEntriesByType('navigation')
  if (pnt) {
    return pnt.loadEventStart - pnt.fetchStart
  }
  const pt = performance.timing
  if (pt) {
    return pt.loadEventEnd - pt.fetchStart
  }
  return 0
}

/**
 * 监听页面加载事件
 * @param callback
 */
export function onLoad(callback: () => void) {
  if (document.readyState === 'complete') {
    callback()
  }
  else {
    window.addEventListener('load', callback)
  }
}

/**
 * 监听页面浏览事件
 * @param callback
 */
export function onView(callback: () => void) {
  if (document.readyState === 'complete') {
    callback()
  }
  else {
    window.addEventListener('pageshow', callback)
  }
}

/**
 * 监听页面离开事件
 * @param callback
 */
export function onUnload(callback: () => void) {
  window.addEventListener('unload', callback)
}
