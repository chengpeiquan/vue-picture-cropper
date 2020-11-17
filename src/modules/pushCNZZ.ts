import CNZZ from '@m/cnzz'

/** 
 * 定义推送操作
 */
class PushCNZZ {
  siteIdList: number[];
  isDebug: boolean;

  constructor (siteIdList: number[], isDebug: boolean) {
    this.siteIdList = siteIdList;
    this.isDebug = isDebug;
  }

  /** 
   * 批量部署站点
   */
  init () {
    this.siteIdList.forEach( (siteId: number) => {
      const SITE = new CNZZ(siteId, this.isDebug);
      SITE.init();
    });
  }

  /** 
   * 批量提交pv上报
   */
  pv (pageUrl: string, fromUrl?: string) {
    this.siteIdList.forEach( (siteId: number) => {
      const SITE = new CNZZ(siteId, this.isDebug);
      SITE.trackPageview(pageUrl, fromUrl);
    });
  }

  /** 
   * 批量提交事件上报
   */
  event (category: string, action: string, label: string, value: number, nodeId: string) {
    this.siteIdList.forEach( (siteId: number) => {
      const SITE = new CNZZ(siteId, this.isDebug);
      SITE.trackEvent(category, action, label, value, nodeId);
    });
  }

}

export default PushCNZZ;