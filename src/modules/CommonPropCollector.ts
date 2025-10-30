import loglevel from 'loglevel'
import { Config } from './Config'
/**
 * 页面信息采集工具类
 */
export class CommonPropCollector {
  /**
   * 获取用户代理(UserAgent)信息
   */
  static getUserAgent(): string {
    return navigator.userAgent
  }

  /**
   * 获取设备像素比
   */
  static getDevicePixelRatio(): number {
    return window.devicePixelRatio || 1
  }

  /**
   * 获取页面语言设置
   */
  static getLanguage(): string {
    return navigator.language
  }

  /**
   * 获取屏幕分辨率
   * @returns {width: number, height: number} 屏幕宽度和高度
   */
  static getScreenResolution(): { width: number, height: number } {
    return {
      width: window.screen.width,
      height: window.screen.height,
    }
  }

  /**
   * 获取浏览器视口大小
   * @returns {width: number, height: number} 视口宽度和高度
   */
  static getViewportSize(): { width: number, height: number } {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight,
    }
  }

  /**
   * 获取浏览器类型
   */
  static getBrowser() {
    const userAgentLower = navigator.userAgent.toLowerCase()
    if (userAgentLower.includes('firefox')) {
      return 'Firefox'
    }
    else if (userAgentLower.includes('chrome')) {
      return 'Chrome'
    }
    else if (userAgentLower.includes('safari')) {
      return 'Safari'
    }
    else if (userAgentLower.includes('opera')) {
      return 'Opera'
    }
    else if (userAgentLower.includes('msie') || userAgentLower.includes('trident')) {
      return 'IE'
    }
    else {
      return 'Unknown'
    }
  }

  /**
   * 获取操作系统类型
   */
  static getOS() {
    const userAgentLower = navigator.userAgent.toLowerCase()
    if (userAgentLower.includes('windows')) {
      return 'Windows'
    }
    else if (userAgentLower.includes('macintosh')) {
      return 'Mac'
    }
    else if (userAgentLower.includes('android')) {
      return 'Android'
    }
    else if (userAgentLower.includes('ios')) {
      return 'iOS'
    }
    else if (userAgentLower.includes('linux')) {
      return 'Linux'
    }
    else {
      return 'Unknown'
    }
  }

  /**
   * 获取设备类型
   */
  static getDeviceType() {
    const userAgentLower = navigator.userAgent.toLowerCase()
    if (userAgentLower.includes('mobile')) {
      return 'Mobile'
    }
    else if (userAgentLower.includes('tablet')) {
      return 'Tablet'
    }
    else {
      return 'Desktop'
    }
  }

  /**
   * 获取时区名称
   */
  static getTimezoneName() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  static getReferrer() {
    if (!document.referrer) {
      return ''
    }
    try {
      return new URL(document.referrer).origin
    }
    catch (error) {
      if (Config.debug) {
        loglevel.info('Failed to parse referrer URL:', error)
      }
      return ''
    }
  }

  /**
   * 收集所有可用的页面信息
   */
  static collectAll(): Record<string, string | number | boolean> {
    const screenResolution = this.getScreenResolution()
    const viewportSize = this.getViewportSize()
    return {
      url: location.href,
      path: location.pathname,
      title: document.title,
      referrer: this.getReferrer(),

      user_agent: this.getUserAgent(),
      os: this.getOS(),
      browser: this.getBrowser(),
      device_type: this.getDeviceType(),
      timezone: this.getTimezoneName(),
      language: this.getLanguage(),

      dpr: this.getDevicePixelRatio(),
      screen_width: screenResolution.width,
      screen_height: screenResolution.height,
      screen_resolution: `${screenResolution.width}x${screenResolution.height}`,
      window_width: viewportSize.width,
      window_height: viewportSize.height,
      window_resolution: `${viewportSize.width}x${viewportSize.height}`,
    }
  }
}
