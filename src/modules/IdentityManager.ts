// Cookie 名称常量
const ANONYMOUS_ID_COOKIE = 'ga_anonymous_id'
const SESSION_ID_COOKIE = 'ga_session_id'

// 默认过期时间
const ANONYMOUS_ID_EXPIRE = 2 * 365 * 24 * 60 * 60 * 1000 // 2年

/**
 * 用户标识管理工具类 - 管理持久Anonymous ID和会话Session ID
 */
export class IdentityManager {
  /**
   * 生成随机ID (32位十六进制字符串)
   * @param length 生成的ID长度(默认32)
   */
  private static generateRandomId(length: number = 32): string {
    const chars = '0123456789abcdef'
    let result = ''

    // 现代浏览器优先使用crypto API
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint8Array(length)
      window.crypto.getRandomValues(values)
      for (let i = 0; i < length; i++) {
        result += chars[values[i] % chars.length]
      }
    }
    else {
      // 回退方案(不推荐用于生产环境)
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)]
      }
    }

    return result
  }

  /**
   * 设置Cookie
   * @param name Cookie名称
   * @param value Cookie值
   * @param expires 过期时间
   */
  private static setCookie(name: string, value: string, expires?: number): void {
    let expiresStr = ''

    if (expires !== undefined) {
      const date = new Date()
      date.setTime(date.getTime() + expires)
      expiresStr = `expires=${date.toUTCString()};`
    }

    // 设置SameSite=None和Secure以支持跨站使用
    const sameSite = window.location.protocol === 'https:' ? 'SameSite=None; Secure' : ''

    document.cookie = `${name}=${value};${expiresStr}path=/;${sameSite}`
  }

  /**
   * 获取Cookie
   * @param name Cookie名称
   */
  private static getCookie(name: string): string | null {
    const nameEQ = `${name}=`
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1)
      if (cookie.indexOf(nameEQ) === 0)
        return cookie.substring(nameEQ.length)
    }

    return null
  }

  /**
   * 获取或创建匿名ID(持久存储)
   */
  public static getAnonymousId(): string {
    let anonymousId = this.getCookie(ANONYMOUS_ID_COOKIE)

    if (!anonymousId) {
      anonymousId = this.generateRandomId()
      this.setCookie(
        ANONYMOUS_ID_COOKIE,
        anonymousId,
        ANONYMOUS_ID_EXPIRE,
      )
    }

    return anonymousId
  }

  /**
   * 获取或创建会话ID(临时有效)
   */
  public static getSessionId(): string {
    let sessionId = this.getCookie(SESSION_ID_COOKIE)
    if (!sessionId) {
      sessionId = this.generateRandomId()
      this.setCookie(
        SESSION_ID_COOKIE,
        sessionId,
      )
    }
    return sessionId
  }
}
