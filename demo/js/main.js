// 定义路由信息
const routes = [
  {
    path: '/',
    redirect: '/page1'
  },
  {
    path: '/page1',
    component: {
      template: '<div class="view">当前是 <strong>Page1</strong> 的路由</div>'
    }
  },
  {
    path: '/page2',
    component: {
      template: '<div class="view">当前是 <strong>Page2</strong> 的路由</div>'
    }
  },
  {
    path: '/page3',
    component: {
      template: '<div class="view">当前是 <strong>Page3</strong> 的路由</div>'
    }
  }
];

// 初始化路由
const router = new VueRouter({
  routes,
  linkActiveClass: 'cur',
  linkExactActiveClass: 'cur'
});

// 引入统计插件
Vue.use(cnzzAnalytics, {
  router: router,
  siteIdList: [
    1279045961,
    11111,
    22222,
    33333
  ],
  isDebug: true
});

// 初始化Vue
const app = new Vue({
  el: '#app',
  router,
  data () {
    return {
      pageUrl: '',
      fromUrl: '',
      category: '',
      action: '',
      label: '',
      value: '',
      nodeId: ''
    }
  },
  mounted () {
  },
  methods: {
    pv () {
      this.$pushCNZZ.pv(this.pageUrl, this.fromUrl);
    },
    event () {
      this.$pushCNZZ.event(this.category, this.action, this.label, this.value, this.nodeId);
    }
  }
});