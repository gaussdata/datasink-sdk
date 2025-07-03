/**
 * 页面信息采集工具类
 */
export class Collector {
  /**
   * 获取当前页面的完整URL
   */
  static getCurrentUrl(): string {
    return window.location.href;
  }

  /**
   * 获取页面标题
   */
  static getPageTitle(): string {
    return document.title;
  }

  /**
   * 获取用户代理(UserAgent)信息
   */
  static getUserAgent(): string {
    return navigator.userAgent;
  }

  /**
   * 获取屏幕分辨率
   * @returns {width: number, height: number} 屏幕宽度和高度
   */
  static getScreenResolution(): { width: number; height: number } {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  }

  /**
   * 获取浏览器视口大小
   * @returns {width: number, height: number} 视口宽度和高度
   */
  static getViewportSize(): { width: number; height: number } {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight
    };
  }

  /**
   * 获取设备像素比
   */
  static getDevicePixelRatio(): number {
    return window.devicePixelRatio || 1;
  }

  /**
   * 获取页面语言设置
   */
  static getLanguage(): string {
    return navigator.language;
  }

  /**
   * 获取页面referrer信息
   */
  static getReferrer(): string {
    return document.referrer;
  }

  /**
   * 获取当前时间戳
   */
  static getTimestamp(): number {
    return Date.now();
  }

  /**
   * 收集所有可用的页面信息
   */
  static collectAll(): Record<string, any> {
    return {
      url: this.getCurrentUrl(),
      title: this.getPageTitle(),
      userAgent: this.getUserAgent(),
      screenResolution: this.getScreenResolution(),
      viewportSize: this.getViewportSize(),
      devicePixelRatio: this.getDevicePixelRatio(),
      language: this.getLanguage(),
      referrer: this.getReferrer(),
      timestamp: this.getTimestamp()
    };
  }

  /**
   * 将收集的信息转换为JSON字符串
   */
  static toJSON(): string {
    return JSON.stringify(this.collectAll(), null, 2);
  }
}