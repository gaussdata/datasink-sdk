import type Reporter from '../Reporter'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

interface IMetric {
  name: string
  id: string
  value: number
}

export class PerformanceCollector {
  _initialized = false
  private reporter: Reporter | null = null

  public init(reporter: Reporter): void {
    if (this._initialized) {
      return
    }
    this._initialized = true
    this.reporter = reporter
    this.collectCoreWebVitals()
  }

  private collectCoreWebVitals(): void {
    const track = (metric: IMetric) => {
      this.reporter?.track('$web_vitals', {
        web_vitals_name: metric.name,
        web_vitals_id: metric.id,
        web_vitals_value: metric.value,
      })
    }
    // Core Web Vitals
    onCLS(track)
    onINP(track)
    onLCP(track)
    // Other metrics
    onFCP(track)
    onTTFB(track)
  }
}
