// ../node_modules/.pnpm/@bassist+utils@0.11.2/node_modules/@bassist/utils/lib/index.mjs
var _ = {
  isSupported: typeof navigator > 'u' ? false : Boolean(navigator.clipboard),
  async copy(e) {
    if (!this.isSupported) return false
    const i = e.innerText || e.value
    return await this.write(i)
  },
  async cut(e) {
    return !this.isSupported || !(await this.copy(e))
      ? false
      : ((e.value = ''), true)
  },
  async read() {
    return this.isSupported ? await navigator.clipboard.readText() : ''
  },
  async write(e) {
    return this.isSupported
      ? (await navigator.clipboard.writeText(e), true)
      : false
  },
}
function a() {
  return typeof window < 'u' ? navigator.userAgent.toLowerCase() : ''
}
var l = typeof window < 'u'
var v = /Android/i.test(a())
var y = /iPhone|iPod|iPad|iOS/i.test(a())
var N = /uni-app|html5plus/.test(a())
var F = /MicroMessenger/i.test(a())
var X = /\sQQ|mqqbrowser|qzone|qqbrowser/i.test(a())
var I = /mqqbrowser|qqbrowser/i.test(a())
var E = /qzone\/.*_qz_([\d.]+)/i.test(a())
var P = /(weibo).*weibo__([\d.]+)/i.test(a())
var $ = /(baiduboxapp)\/([\d.]+)/i.test(a())
function w([e, ...i]) {
  return e ? e.toUpperCase() + i.join('') : ''
}
function g([e, ...i]) {
  return e
    ? (e.toLowerCase() + i.join('')).replace(/[-_](\w)/g, (t, r) =>
        r ? r.toUpperCase() : '',
      )
    : ''
}
function Y(e) {
  return e ? w(g(e)) : ''
}
function te({ type: e, id: i, resource: o2 }) {
  return new Promise((t, r) => {
    if (!l || document.querySelector(`#${i}`)) {
      r()
      return
    }
    function s(n) {
      n.addEventListener('load', t),
        n.addEventListener('error', r),
        n.addEventListener('abort', r)
    }
    switch (e) {
      case 'js': {
        const n = document.createElement('script')
        ;(n.id = i),
          (n.async = true),
          (n.src = o2),
          s(n),
          document.head.appendChild(n)
        break
      }
      case 'css': {
        const n = document.createElement('link')
        ;(n.id = i),
          (n.rel = 'stylesheet'),
          (n.href = o2),
          s(n),
          document.head.appendChild(n)
        break
      }
      case 'style': {
        const n = document.createElement('style')
        ;(n.id = i),
          s(n),
          document.head.appendChild(n),
          n.appendChild(document.createTextNode(o2))
        break
      }
    }
  })
}
function G() {
  try {
    return 'development'
  } catch {
    return
  }
}
var Se = G()
function f(e) {
  try {
    return 'development' === e
  } catch {
    return false
  }
}
var Te = f('development')
var Ae = f('test')
var Ke = f('production')

// ../node_modules/.pnpm/@web-analytics+core@0.1.5/node_modules/@web-analytics/core/lib/index.mjs
var m = Object.defineProperty
var y2 = (t, e, s) =>
  e in t
    ? m(t, e, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: s,
      })
    : (t[e] = s)
var o = (t, e, s) => (y2(t, typeof e != 'symbol' ? e + '' : e, s), s)
var A = 'web-analytics-core'
var E2 = [
  /**
   * Baidu analysis platform
   * @website https://tongji.baidu.com
   * @docs https://tongji.baidu.com/open/api
   */
  'baidu',
  /**
   * U-Web(CNZZ) analysis platform
   * @website https://www.umeng.com/web
   * @docs https://developer.umeng.com/docs/67963/detail/74517
   */
  'cnzz',
]
var u = ((t) => (
  (t.SetAutoPageview = '_setAutoPageview'),
  (t.SetAccount = '_setAccount'),
  (t.TrackPageview = '_trackPageview'),
  (t.TrackEvent = '_trackEvent'),
  t
))(u || {})
function D({
  pluginId: t,
  platform: e,
  websiteId: s,
  propertyKey: r,
  args: n,
}) {
  const i = []
  switch (r) {
    case 'loadSdk': {
      i.push('JS-SDK load done.')
      break
    }
    case 'setAccount': {
      i.push('set account done.')
      break
    }
    case 'trackPageview': {
      const { pageUrl: c2, fromUrl: h2 } = n[0] || {}
      i.push('track pageview done.'),
        i.push(`pageUrl:      ${p(c2)}`),
        e === 'cnzz' && h2 && i.push(`fromUrl:      ${p(h2)}`)
      break
    }
    case 'trackEvent': {
      const {
        category: c2,
        action: h2,
        label: f2,
        value: I2,
        nodeId: $2,
      } = n[0] || {}
      i.push('track event done.'),
        i.push(`category:     ${c2}`),
        i.push(`action:       ${h2}`),
        i.push(`label:        ${l2(f2)}`),
        i.push(`value:        ${g2(I2)}`),
        e === 'cnzz' && i.push(`nodeId:       ${b($2)}`)
      break
    }
  }
  i.push(`websiteId:    ${s}`),
    i.push(`time:         ${/* @__PURE__ */ new Date()}`)
  const a2 = i.join(`
`)
  return `
[${t}] ${Y(e)} Analytics ${a2}

`
}
function p(t) {
  if (((!t || typeof t != 'string') && (t = '/'), t.startsWith('http'))) {
    const e = t.split('/'),
      s = `${e[0]}//${e[2]}`
    t = t.replace(s, '')
  }
  return t
}
function O(t) {
  return (
    (!t || (t && typeof t != 'string')) && (t = ''),
    typeof t == 'string' && !t.includes('http') && (t = ''),
    t
  )
}
function b(t) {
  return (!t || typeof t != 'string') && (t = ''), t
}
function l2(t) {
  return (!t || typeof t != 'string') && (t = ''), t
}
function g2(t) {
  return (!t || !Number(t)) && (t = 1), t
}
function w2(t, e, s) {
  const r = s.value
  return (
    (s.value = function (...n) {
      const { debug: i, pluginId: a2, platform: c2, websiteId: h2 } = this
      if (i) {
        const f2 = D({
          pluginId: a2,
          platform: c2,
          websiteId: h2,
          propertyKey: e,
          args: n,
        })
        console.log(f2)
      }
      r.apply(this, n)
    }),
    s
  )
}
function S(t, e, s) {
  const r = s.value
  return (
    (s.value = function (...n) {
      const [i] = n,
        { category: a2, action: c2 } = i
      if (typeof a2 != 'string' || typeof c2 != 'string' || !a2 || !c2) {
        this.throwError(
          'Valid `category` and `action` are missing from the track event options.',
        )
        return
      }
      r.apply(this, n)
    }),
    s
  )
}
var T = Object.defineProperty
var j = Object.getOwnPropertyDescriptor
var L = (t, e, s, r) => {
  for (
    var n = r > 1 ? void 0 : r ? j(e, s) : e, i = t.length - 1, a2;
    i >= 0;
    i--
  )
    (a2 = t[i]) && (n = (r ? a2(e, s, n) : a2(n)) || n)
  return r && n && T(e, s, n), n
}
var k = class {
  constructor({ pluginId: e, platform: s, websiteId: r, debug: n }) {
    o(this, 'pluginId')
    o(this, 'platform')
    o(this, 'sdkInstance')
    o(this, 'sdkUrl', '')
    o(this, 'websiteId', '')
    o(this, 'debug')
    ;(this.pluginId = e || A),
      (this.platform = s),
      (this.websiteId = r),
      (this.debug = n ?? false),
      this.updatePlatformInfo(),
      this.loadSdk()
  }
  /**
   * Smooth out the differences between different platforms
   */
  updatePlatformInfo() {
    if (l)
      switch (this.platform) {
        case 'baidu': {
          ;(this.sdkInstance = window._hmt || []),
            (this.sdkUrl = `https://hm.baidu.com/hm.js?${this.websiteId}`)
          break
        }
        case 'cnzz': {
          ;(this.sdkInstance = window._czc || []),
            (this.sdkUrl = `https://v1.cnzz.com/z_stat.php?id=${this.websiteId}&web_id=${this.websiteId}`)
          break
        }
        default: {
          const e = E2.join(', ')
          this.throwError(`Unsupported platform options, only supported: ${e}.`)
        }
      }
  }
  loadSdk() {
    !this.sdkInstance ||
      !this.sdkUrl ||
      (this.sdkInstance.push([u.SetAutoPageview, false]),
      te({
        type: 'js',
        id: `${this.pluginId}-${this.platform}-${this.websiteId}`,
        resource: this.sdkUrl,
      }).catch((e) => {
        console.log(e)
      }))
  }
  throwError(e) {
    throw new Error(`[${this.pluginId}] ${e}`)
  }
}
L([w2], k.prototype, 'loadSdk', 1)
var C = Object.defineProperty
var F2 = Object.getOwnPropertyDescriptor
var v2 = (t, e, s, r) => {
  for (
    var n = r > 1 ? void 0 : r ? F2(e, s) : e, i = t.length - 1, a2;
    i >= 0;
    i--
  )
    (a2 = t[i]) && (n = (r ? a2(e, s, n) : a2(n)) || n)
  return r && n && C(e, s, n), n
}
var d = class extends k {
  constructor({ pluginId: e, platform: s, websiteId: r, debug: n }) {
    super({ pluginId: e, platform: s, websiteId: r, debug: n })
  }
  /**
   * Provide multi-account switching for upper-level plugins
   */
  setAccount() {
    this.sdkInstance && this.sdkInstance.push([u.SetAccount, this.websiteId])
  }
  trackPageview({
    pageUrl: e,
    // @ts-ignore
    fromUrl: s,
  }) {
    if (this.sdkInstance)
      switch ((this.setAccount(), this.platform)) {
        case 'baidu': {
          this.sdkInstance.push([u.TrackPageview, p(e)])
          break
        }
        case 'cnzz': {
          this.sdkInstance.push([u.TrackPageview, p(e), s ? O(s) : ''])
          break
        }
      }
  }
  trackEvent({
    category: e,
    action: s,
    label: r,
    value: n,
    // @ts-ignore
    nodeId: i,
  }) {
    if (this.sdkInstance)
      switch ((this.setAccount(), this.platform)) {
        case 'baidu': {
          this.sdkInstance.push([u.TrackEvent, e, s, l2(r), g2(n)])
          break
        }
        case 'cnzz': {
          this.sdkInstance.push([u.TrackEvent, e, s, l2(r), g2(n), b(i)])
          break
        }
      }
  }
}
v2([w2], d.prototype, 'trackPageview', 1)
v2([w2, S], d.prototype, 'trackEvent', 1)
function M(t) {
  return new d({
    platform: 'baidu',
    ...t,
  })
}
function R(t) {
  return new d({
    platform: 'cnzz',
    ...t,
  })
}

// ../node_modules/.pnpm/@web-analytics+vue@0.2.2/node_modules/@web-analytics/vue/lib/index.mjs
var g3 = Object.defineProperty
var w3 = (t, e, r) =>
  e in t
    ? g3(t, e, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: r,
      })
    : (t[e] = r)
var c = (t, e, r) => (w3(t, typeof e != 'symbol' ? e + '' : e, r), r)
var p2 = class {
  constructor({ platform: e, websiteIds: r, debug: n }) {
    c(this, 'pluginId')
    c(this, 'platform')
    c(this, 'websiteIds')
    c(this, 'instances')
    c(this, 'debug')
    ;(this.pluginId = 'web-analytics-vue'),
      (this.platform = e),
      (this.websiteIds = r || []),
      (this.instances = []),
      (this.debug = n ?? false),
      this.init()
  }
  init() {
    try {
      switch (this.platform) {
        case 'baidu': {
          this.websiteIds.forEach((e) => {
            const r = M({
              pluginId: this.pluginId,
              websiteId: e,
              debug: this.debug,
            })
            this.instances.push(r)
          })
          break
        }
        case 'cnzz': {
          this.websiteIds.forEach((e) => {
            const r = R({
              pluginId: this.pluginId,
              websiteId: e,
              debug: this.debug,
            })
            this.instances.push(r)
          })
          break
        }
        default: {
          const e = E2.join(', ')
          this.throwError(`Unsupported platform options, only supported: ${e}.`)
          break
        }
      }
    } catch (e) {
      this.throwError(`Plugin initialization failed: ${e}.`)
    }
  }
  trackPageview(e) {
    this.instances.forEach((r) => r.trackPageview({ ...e }))
  }
  trackEvent(e) {
    this.instances.forEach((r) => r.trackEvent({ ...e }))
  }
  throwError(e) {
    throw new Error(`[${this.pluginId}] ${e}`)
  }
}
function d2({ version: t }) {
  try {
    const [r] = t.split('.')
    return r ? Number(r) : 3
  } catch {
    return 3
  }
}
function h(t) {
  return E2.includes(t) ? `$${t}Analytics` : ''
}
function y3({ analytics: t, platform: e }) {
  return (r, n) => {
    if (!l) return
    const s = new p2({ platform: e, ...n })
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && (t[i] = s[i])
    const o2 = Object.getPrototypeOf(s)
    Object.setPrototypeOf(t, o2)
    const a2 = h(e)
    if (a2)
      switch (d2(r)) {
        case 2: {
          r.prototype[a2] = t
          break
        }
        case 3: {
          r.config.globalProperties[a2] = t
          break
        }
      }
  }
}
function O2() {
  const t = {}
  return {
    baiduAnalytics: t,
    registerBaiduAnalytics: y3({
      analytics: t,
      platform: 'baidu',
    }),
  }
}
function m2() {
  const t = {}
  return {
    cnzzAnalytics: t,
    registerCnzzAnalytics: y3({
      analytics: t,
      platform: 'cnzz',
    }),
  }
}
function b2({ analytics: t, platform: e }) {
  return {
    install: (r, { router: n, ...s }) => {
      if (!l) return
      const o2 = new p2({ platform: e, ...s })
      for (const u2 in o2)
        Object.prototype.hasOwnProperty.call(o2, u2) && (t[u2] = o2[u2])
      const a2 = Object.getPrototypeOf(o2)
      Object.setPrototypeOf(t, a2)
      const i = h(e)
      if (i)
        switch (d2(r)) {
          case 2: {
            r.prototype[i] = t
            break
          }
          case 3: {
            r.config.globalProperties[i] = t
            break
          }
        }
      n &&
        n.afterEach(() => {
          t.trackPageview({
            pageUrl: window.location.href,
          })
        })
    },
  }
}
function v3() {
  const t = {}
  return {
    baiduAnalytics: t,
    registerBaiduAnalytics: b2({
      analytics: t,
      platform: 'baidu',
    }),
  }
}
function E3() {
  const t = {}
  return {
    cnzzAnalytics: t,
    registerCnzzAnalytics: b2({
      analytics: t,
      platform: 'cnzz',
    }),
  }
}
export {
  O2 as createVitePressBaiduAnalytics,
  m2 as createVitePressCnzzAnalytics,
  v3 as createVueBaiduAnalytics,
  E3 as createVueCnzzAnalytics,
}
//# sourceMappingURL=@web-analytics_vue.js.map
