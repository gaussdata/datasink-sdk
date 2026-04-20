import type Reporter from '../Reporter'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

/**
 * 性能指标采集器，用于采集 Core Web Vitals 指标
 */
export class PerformanceCollector {
  private reporter: Reporter | null = null

  /**
   * 初始化性能指标采集
   */
  public init(reporter: Reporter): void {
    this.reporter = reporter
    this.collectCoreWebVitals()
  }

  /**
   * 采集 Core Web Vitals 指标
   */
  private collectCoreWebVitals(): void {
    // 采集累积布局偏移 (CLS)
    onCLS((metric) => {
      this.reporter?.track('$web_vitals', {
        web_vitals_name: metric.name,
        web_vitals_id: metric.id,
        web_vitals_value: metric.value,
      })
    })

    // 采集交互到下一次绘制 (INP) - 替代 FID
    onINP((metric) => {
      this.reporter?.track('$web_vitals', {
        web_vitals_name: metric.name,
        web_vitals_id: metric.id,
        web_vitals_value: metric.value,
      })
    })

    // 采集首次内容绘制 (FCP)
    onFCP((metric) => {
      this.reporter?.track('$web_vitals', {
        web_vitals_name: metric.name,
        web_vitals_id: metric.id,
        web_vitals_value: metric.value,
      })
    })

    // 采集最大内容绘制 (LCP)
    onLCP((metric) => {
      this.reporter?.track('$web_vitals', {
        web_vitals_name: metric.name,
        web_vitals_id: metric.id,
        web_vitals_value: metric.value,
      })
    })

    // 采集首字节时间 (TTFB)
    onTTFB((metric) => {
      this.reporter?.track('$web_vitals', {
        web_vitals_name: metric.name,
        web_vitals_id: metric.id,
        web_vitals_value: metric.value,
      })
    })
  }
}
