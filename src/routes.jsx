/**
 * 定义应用路由
 */
import React from 'react';
import {
  Router,
  // browserHistory,
  hashHistory,
} from 'react-router';
import { Provider } from 'react-redux'
import store from './store'
import myCustomRoutes from './_routes1'

// 路由配置规则参考： https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
// 一下部分是由 ICE 相关工具自动生成的路由，请勿随意改变，否则可能会出现一些异常情况
// <!-- auto generated routes start -->
import HeaderAsideFooterResponsiveLayout from "./layouts/HeaderAsideFooterResponsiveLayout";

import CardList from './pages/CardList';
const autoGeneratedRoutes = [{
  path: '/',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: CardList
  }
}];
// <!-- auto generated routes end -->

// 自定义路由，如果 path 相同则会覆盖自动生成部分的路由配置
const customRoutes = [];

export default (
  <Provider store={store}>
    <Router
      history={hashHistory}
      routes={[...autoGeneratedRoutes, ...customRoutes, ...myCustomRoutes]}
    />
  </Provider>
);
