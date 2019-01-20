// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { hmr: true },
        targets: { ie: 11 },
        locale: {
          enable: true,
          // default false
          default: 'zh-CN',
          // default zh-CN
          baseNavigator: true,
        },
        // default true, when it is true, will use `navigator.language` overwrite default
        dynamicImport: { loadingComponent: './components/PageLoading/index' },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: { ie: 11 },
  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/login',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/login',
          component: './user-login',
        },
      ],
    },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          component: './Welcome',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/login',
        },
        // dashboard
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: 'https://github.com/umijs/umi-blocks/tree/master/ant-design-pro',
          name: 'more-blocks',
          icon: 'block',
        },
        {
          name: 'user-login',
          icon: 'smile',
          path: '/user-login',
          component: './user-login',
        },
        {
          name: 'table-list',
          icon: 'smile',
          path: '/table-list',
          component: './table-list',
        },
        {
          name: 't66y-table-list',
          icon: 'smile',
          path: '/t66y',
          component: './t66y-table-list',
        },
        {
          name: 'demo',
          icon: 'smile',
          path: '/demo',
          component: './demo',
        },
        {
          name: 'user-register',
          icon: 'smile',
          path: '/user-register',
          component: './user-register',
        },
        // {
        //   name: 'analysis',
        //   icon: 'smile',
        //   path: '/analysis',
        //   component: './analysis',
        // },
      ],
    },
  ],
  // {
  //   path: '/test',
  //   name: 'test',
  //   icon: 'smile',
  //   component: './test',
  // },
  disableRedirectHoist: true,
  /**
   * webpack 相关配置
   */
  define: { APP_TYPE: process.env.APP_TYPE || '' },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: { 'primary-color': primaryColor },
  externals: { '@antv/data-set': 'DataSet' },
  ignoreMomentLocale: true,
  lessLoaderOptions: { javascriptEnabled: true },
  proxy: {
    '/t66y/': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
    },
    '/service-cipher/': {
      target: 'http://172.28.0.51:8080/',
      changeOrigin: true,
    },
  },
};
