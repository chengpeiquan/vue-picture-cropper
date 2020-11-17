import PushCNZZ from '@m/pushCNZZ'

export default function install (Vue: Vue, { router, siteIdList, isDebug = false }: Partial<Options>) {

  /** 
   * 一些环境和参数的检查
   */
  if ( typeof document === 'undefined' || typeof window === 'undefined' ) {
    return false;
  }

  if ( !router ) {
    throw new Error('[vue-cnzz-analytics] Must pass a Vue-Router instance to vue-cnzz-analytics.');
  }

  if ( !siteIdList ) {
    throw new Error('[vue-cnzz-analytics] Missing tracking domain ID, add at least one of cnzz analytics.');
  }

  /** 
   * 挂载推送的方法
   */
  const pushCNZZ = new PushCNZZ(siteIdList, isDebug);
  Vue.prototype.$pushCNZZ = pushCNZZ;

  /** 
   * 部署站点并初始化
   */
  if ( siteIdList ) {
    pushCNZZ.init();
  }

  /** 
   * 路由切换时执行PV上报
   */
  router.afterEach( (to: To) => {
    const PAGE_PATH_DIR_COUNT = window.location.pathname.split('/').length;
    const PAGE_PATH = window.location.pathname.split('/').slice(0, PAGE_PATH_DIR_COUNT - 1).join('/');
    const PAGE_URL = router.mode === 'hash' ? `${PAGE_PATH}/#${to.fullPath}` : `${PAGE_PATH}${to.fullPath}`;

    pushCNZZ.pv(PAGE_URL);
  });
}
