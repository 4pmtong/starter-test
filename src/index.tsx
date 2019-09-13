import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import Exception from '@/pages/exception/index';
import * as React from 'react';
import 'react-app-polyfill/stable';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import routes from '@/router/routes';
import pathToRegexp from 'path-to-regexp';
import 'src/styles/index.scss';
import { IRouteMap, IRoutes } from '@/types/index';
import { getToken, getStore } from '@/utils/auth';
import { extractRoute, getMenuSelectedAndOpenKeys } from '@/utils/sidebar';
import App from './App';

// mock数据
import './mock/index';

import * as serviceWorker from './serviceWorker';

NProgress.configure({ showSpinner: false });
NProgress.start();
beforeRender()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root') as HTMLElement
    );
  })
  .catch(err => {
    ReactDOM.render(
      // TODO: title & desc should follow err message
      <Exception
        title="500"
        desc="The server has made a small mistake, please come back later."
      />,
      document.getElementById('root') as HTMLElement
    );
  })
  .finally(() => {
    NProgress.done();
  });

async function beforeRender() {
  // TODO: for future login
  let isLogin = true;
  let userInfo = null;
  if (pathToRegexp(location.pathname).test('/login/')) {
    return;
  }

  if (getToken() && getStore('userInfo')) {
    isLogin = true;
    const info = getStore('userInfo') || null;
    userInfo = info;
  } else {
    return;
  }

  const extractRouteMap = extractRoute(routes, [], []);
  const extractAllRoutes = extractRouteMap.all;
  const breadcrumbMap = extractAllRoutes.reduce(
    (obj: IRouteMap, item: IRoutes): IRouteMap => {
      const key = item.path;
      return { ...obj, [`${key}`]: item };
    },
    {}
  );
  const extractFilterRoutes = extractRouteMap.filter;
  // 可跳转的路由映射
  const realRouteMap = extractFilterRoutes.reduce(
    (obj: IRouteMap, item: IRoutes): IRouteMap => {
      const key = item.path;
      return { ...obj, [`${key}`]: item };
    },
    {}
  );
  const firstLink = extractFilterRoutes[0].path;
  const menuSelectedOpen = getMenuSelectedAndOpenKeys(
    extractFilterRoutes,
    breadcrumbMap
  );
  const selectedKeys = [menuSelectedOpen.selectedKey];
  const openKeys = menuSelectedOpen.openKeys;
  store.dispatch({
    type: 'INIT_STATE',
    payload: {
      isLogin,
      userInfo,
      firstLink,
      routes,
      extractAllRoutes,
      extractFilterRoutes,
      breadcrumbMap,
      realRouteMap,
      selectedKeys,
      openKeys
    }
  });
  return;
}

serviceWorker.unregister();
