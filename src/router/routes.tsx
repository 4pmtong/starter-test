import loadable from '@loadable/component';
import Loading from '@/components/loading';
import * as React from 'react';

import Loadable2 from 'react-loadable';
import { IRoutes } from '@/types/index';

// Code Splitting lazy loaded
const About = Loadable2({
  loader: () => import('@/pages/about'),
  loading: Loading
});

import Index from '@/pages/index';
import User from '@/pages/user';

const Data = loadable(() => import('@/pages/data'));

function activity() {
  return <h3>activity</h3>;
}

function Setting() {
  return <h3>Setting</h3>;
}

function orderly() {
  return <h3>orderly</h3>;
}

function unordered() {
  return <h3>unordered</h3>;
}

const routes: IRoutes[] = [
  {
    title: 'Index',
    icon: 'appstore',
    exact: true,
    path: '/index',
    component: Index
  },
  {
    title: 'About',
    icon: 'eye',
    path: '/about',
    component: About
  },
  {
    title: 'User',
    icon: 'user',
    path: '/user',
    component: User,
    routes: [
      {
        title: 'User Info',
        icon: 'appstore',
        path: '/user/data',
        routes: [
          {
            title: 'User Info',
            icon: 'appstore',
            path: '/user/data/index',
            component: Data
          },
          {
            title: 'User Activity',
            icon: 'appstore',
            noSidebar: true,
            path: '/user/data/activity',
            component: activity
          }
        ]
      },
      {
        title: 'About User',
        icon: 'appstore',
        path: '/user/about',
        component: About
      }
    ]
  },
  {
    title: 'Setting',
    icon: 'setting',
    path: '/setting',
    component: Setting
  },
  {
    title: 'Form',
    icon: 'form',
    path: '/form',
    routes: [
      {
        title: 'List',
        icon: 'bars',
        path: '/form/list',
        routes: [
          {
            title: 'Ordered List',
            path: '/form/list/orderly',
            component: orderly
          },
          {
            title: 'Unordered List',
            path: '/form/list/unordered',
            component: unordered
          }
        ]
      }
    ]
  }
];
export default routes;
