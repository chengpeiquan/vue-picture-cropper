/** 
 * 定义基础配置
 * 官方文档 https://developer.umeng.com/docs/67963/detail/74517
 */
class CNZZ {
  siteId: number;
  isDebug: boolean;

  constructor (siteId: number = 0, isDebug: boolean = false) {
    this.siteId = siteId;
    this.isDebug = isDebug;
  }

  /** 
   * 初始化
   */
  init () {
    window._czc = window._czc ? window._czc : [];
    const SCRIPT = document.createElement('script');
    SCRIPT['async'] = true;
    SCRIPT['src'] = `https://s9.cnzz.com/z_stat.php?id=${this.siteId}&web_id=${this.siteId}`;
    document.querySelector('head').appendChild(SCRIPT);

    if ( this.isDebug ) {
      console.log(`[vue-cnzz-analytics] siteId load done.\nsiteId:    ${this.siteId}`);
    }
  }

  /** 
   * 设置要响应的站点
   */
  setAccount () {
    window._czc.push(['_setAccount', this.siteId]);
  }

  /** 
   * 提交PV、UV
   */
  trackPageview (pageUrl: string, fromUrl?: string) {
    // 如果页面链接没传或者无效链接，则默认为根域名
    if ( !pageUrl || typeof pageUrl !== 'string' ) {
      pageUrl = '/';
    }

    // 如果页面链接带上了域名，则需要过滤掉
    if ( pageUrl.includes('http') ) {
      const PAGE_CUT = pageUrl.split('/');
      const HOST_NAME = `${PAGE_CUT[0]}//${PAGE_CUT[2]}`;
      pageUrl = pageUrl.replace(HOST_NAME, '');
    }

    // 如果来路url异常，则设置为空
    if ( !fromUrl || (fromUrl && typeof fromUrl !== 'string') ) {
      fromUrl = '';
    }

    // 如果来路url没有带上http/https，也是设置为空
    if ( typeof fromUrl === 'string' && !fromUrl.includes('http') ) {
      fromUrl = '';
    }

    // 设置响应id并提交数据
    this.setAccount();

    if ( fromUrl ) {
      window._czc.push(['_trackPageview', pageUrl, fromUrl]);
    } else {
      window._czc.push(['_trackPageview', pageUrl]);
    }

    if ( this.isDebug ) {
      console.log(`[vue-cnzz-analytics] track pv done.\nsiteId:    ${this.siteId}\npageUrl:   ${pageUrl}\nfromUrl:   ${fromUrl}`);
    }
  }

  /** 
   * 提交点击事件
   */
  trackEvent (category: string, action: string, label: string, value: number, nodeId: string) {
    // 前两个是必填项
    if ( typeof category !== 'string' ||  typeof action !== 'string' || !category || !action ) {
      throw new Error('[vue-cnzz-analytics] Missing necessary category and operation information, and must be of type string.');
      return false;
    }

    // 重置一些无效的默认值
    if ( !label || typeof label !== 'string'  ) {
      label = '';
    }

    if ( !Number(value) ) {
      value = 0;
    }

    if ( !nodeId || typeof nodeId !== 'string' ) {
      nodeId = '';
    }

    // 设置响应id并提交数据
    this.setAccount();

    if ( nodeId ) {
      window._czc.push(['_trackEvent', category, action, label, value, nodeId]);
    } else {
      window._czc.push(['_trackEvent', category, action, label, value]);
    }

    if ( this.isDebug ) {
      console.log(`[vue-cnzz-analytics] track event done.\nsiteId:   ${this.siteId}\ncategory: ${category}\naction:   ${action}\nlabel:    ${label}\nvalue:    ${value}\nnodeId:   ${nodeId}`);
    }
  }
}

export default CNZZ;