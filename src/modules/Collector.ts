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
   * 获取浏览器类型
   */
  static getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Firefox') !== -1) {
      return 'Firefox';
    } else if (userAgent.indexOf('Chrome') !== -1) {
      return 'Chrome';
    } else if (userAgent.indexOf('Safari') !== -1) {
      return 'Safari';
    } else if (userAgent.indexOf('Opera') !== -1) {
      return 'Opera';
    } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) {
      return 'IE';
    } else {
      return 'Unknown';
    }
  }

  /**
   * 获取操作系统类型
   */
  static getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Windows') !== -1) {
      return 'Windows';
    } else if (userAgent.indexOf('Macintosh') !== -1) {
      return 'Mac';
    } else if (userAgent.indexOf('Linux') !== -1) {
      return 'Linux';
    } else {
      return 'Unknown';
    }
  }

  /**
   * 获取设备类型
   */
  static getDeviceType() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Mobile') !== -1) {
      return 'Mobile';
    } else if (userAgent.indexOf('Tablet') !== -1) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }

  /**
   * 获取时区名称
   */
  static getTimezoneName() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /**
   * 收集所有可用的页面信息
   */
  static collectAll(): Record<string, string | number | boolean> {
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
      os: this.getOS(),
      browser: this.getBrowser(),
      device_type: this.getDeviceType(),
      timezone: this.getTimezoneName(),
      
      screen_width: screenResolution.width,
      screen_height: screenResolution.height,
      window_width: viewportSize.width,
      window_height: viewportSize.height,
    };
  }
}