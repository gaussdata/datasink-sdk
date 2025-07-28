/**
 * 页面信息采集工具类
 */
export class Collector {

  /**
   * 获取用户代理(UserAgent)信息
   */
  static getUserAgent(): string {
    return navigator.userAgent;
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
   * 收集所有可用的页面信息
   */
  static collectAll(): Record<string, any> {
    const screenResolution = this.getScreenResolution();
    const viewportSize = this.getViewportSize();
    return {
      url: document.URL,
      path: location.pathname,
      title: document.title,
      referrer: document.referrer,
    
      dpr: this.getDevicePixelRatio(),
      user_agent: this.getUserAgent(),
      language: this.getLanguage(),

      screen_width: screenResolution.width,
      screen_height: screenResolution.height,
      window_width: viewportSize.width,
      window_height: viewportSize.height,
    };
  }
}