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
    const userAgent = navigator.userAgent
    if (userAgent.includes('Firefox')) {
      return 'Firefox'
    }
    else if (userAgent.includes('Chrome')) {
      return 'Chrome'
    }
    else if (userAgent.includes('Safari')) {
      return 'Safari'
    }
    else if (userAgent.includes('Opera')) {
      return 'Opera'
    }
    else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
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
    const userAgent = navigator.userAgent
    if (userAgent.includes('Windows')) {
      return 'Windows'
    }
    else if (userAgent.includes('Macintosh')) {
      return 'Mac'
    }
    else if (userAgent.includes('Linux')) {
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
    const userAgent = navigator.userAgent
    if (userAgent.includes('Mobile')) {
      return 'Mobile'
    }
    else if (userAgent.includes('Tablet')) {
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
      referrer: document.referrer,

      user_agent: this.getUserAgent(),
      language: this.getLanguage(),
      os: this.getOS(),
      browser: this.getBrowser(),
      device_type: this.getDeviceType(),
      timezone: this.getTimezoneName(),

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
