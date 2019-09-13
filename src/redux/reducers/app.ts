import { IReduxAction, IStoreState } from '@/types/index';
import { getMenuSelectedAndOpenKeys, matchOpenKeys } from '@/utils/sidebar';

// 初始化state
const initialState: IStoreState = {
  // TODO: for future login
  isLogin: true,
  firstLink: '/', // 默认跳转的首页
  userInfo: {}, // 用户信息
  routes: [], // 路由列表
  extractAllRoutes: [], // 单层全部路由列表
  extractFilterRoutes: [], // 单层过滤后的路由列表
  breadcrumbMap: {}, // 单层全部路由映射
  realRouteMap: {}, // 可跳转的路由映射
  collapsed: false,
  selectedKeys: [], // sidebar selected
  openKeys: [] // sidebar expanded
};

export default function(state = initialState, action: IReduxAction) {
  switch (action.type) {
    // 初始化 state
    case 'INIT_STATE': {
      const {
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
      } = action.payload;
      return {
        ...state,
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
      };
    }

    // 触发侧边栏折叠动作
    case 'TOGGLE_COLLAPSED': {
      const { collapsed } = action.payload;
      // 如果侧边栏展开
      if (!collapsed) {
        const { selectedKey, openKeys } = getMenuSelectedAndOpenKeys(
          state.extractFilterRoutes,
          state.breadcrumbMap
        );
        return {
          ...state,
          collapsed,
          selectedKeys: [selectedKey],
          openKeys
        };
      }
      return {
        ...state,
        collapsed,
        openKeys: ['']
      };
    }

    // 触发菜单选择
    case 'TOGGLE_MENU_SELECT': {
      const { selectedKeys } = action.payload;
      const openKeys = matchOpenKeys(selectedKeys[0]);
      return {
        ...state,
        selectedKeys,
        openKeys
      };
    }

    // 触发菜单展开
    case 'TOGGLE_MENU_OPEN': {
      const { openKeys } = action.payload;
      return {
        ...state,
        openKeys
      };
    }
    default:
      return state;
  }
}