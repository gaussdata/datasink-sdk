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
   * 收集所有可用的页面信息
   */
  static collectAll(): Record<string, any> {
    const screenResolution = this.getScreenResolution();
    const viewportSize = this.getViewportSize();

    return {
      url: this.getCurrentUrl(),
      title: this.getPageTitle(),
      referrer: this.getReferrer(),

      dpr: this.getDevicePixelRatio(),
      user_agent: this.getUserAgent(),
      language: this.getLanguage(),

      screen_width: screenResolution.width,
      screen_height: screenResolution.height,
      window_width: viewportSize.width,
      window_height: viewportSize.height,
    };
  }

  /**
   * 将收集的信息转换为JSON字符串
   */
  static toJSON(): string {
    return JSON.stringify(this.collectAll(), null, 2);
  }
}