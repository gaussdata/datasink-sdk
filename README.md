# datasink-sdk

一个轻量、可扩展的前端埋点 SDK，用于在浏览器中收集页面信息与用户行为事件，并通过 `navigator.sendBeacon` 以批量方式上报到服务端。

## 功能特性
- 自动采集：页面加载、浏览、离开、点击等事件（`$page_load`、`$page_view`、`$page_leave`、`$element_click`）。
- 环境采集：URL、UA、语言、OS、浏览器、设备类型、时区、屏幕与视口尺寸等。
- 身份标识：自动生成并维护匿名 ID（2 年）与会话 ID（Session）。
- 队列与批量：队列最大 1000 条，按 10 条/批，每秒消费并上报。
- 传输方式：使用 `navigator.sendBeacon`，在页面卸载时也能可靠上报。
- DNT 兼容：遵循浏览器 `Do Not Track` 设置。

## 快速上手

### 方式一：通过 UMD 引入
```html
<script src="/lib/gaussdata.min.js"></script>
<script>
  // 初始化并设置上报地址
  GaussData.getInstance()
  GaussData.setUrl('https://your-server/collector/t')
  // 手动上报一个自定义事件
  GaussData.track('order_submit', { order_id: '123', amount: 99.9 })
</script>
```

### 方式二：在项目中以源码使用（ESM）

```ts
import GaussData from './src/Reporter'

GaussData.getInstance()
GaussData.setUrl('https://your-server/collector/t')
GaussData.track('login', { method: 'password' })
```

## 自动采集事件

无需额外配置，初始化后会自动采集：

- `$page_load`：页面加载完成后触发。
- `$page_view`：进入页面或路由变化后触发，记录可视位置。
- `$page_leave`：离开前触发，记录停留时长与可视位置。
- `$element_click`：元素点击事件，包含元素 id/class/text 及点击坐标。

## 手动埋点

```ts
GaussData.track('product_view', { product_id: 'sku-001' });
```

`track(code, data)` 会自动合并环境采集信息，并补充 `head`：

- `code`：事件标识。
- `lib`/`lib_version`：SDK 类型与版本（来自 `package.json`）。
- `time`：事件生成时间戳。
- `aaid`/`sid`：匿名 ID 与会话 ID。

## 上报与批处理

- 队列最大 1000 条，默认每秒消费。
- 每批最多 10 条，批内事件会序列化为 JSON 数组并通过 `sendBeacon` 上报到 `url`。
- 默认 `url = '/t'`，可通过 `GaussData.setUrl('...')` 修改。

## 注意事项

- 若浏览器开启 `Do Not Track`，SDK 将不采集与上报。
- Cookie 的 `SameSite=None; Secure` 在 HTTPS 下生效，HTTP 环境自动降级处理。
- 依赖浏览器环境（DOM、History、Crypto、Beacon API）。

## 许可证

本项目采用 MIT 许可证，详见 `LICENSE`。