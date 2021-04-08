// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入vant组件库
//import Vant from 'vant'
//import 'vant/lib/actionsheet/index.css'
//Vue.use(Vant)

import {
  Tabbar,
  TabbarItem,
  Button,
  Icon,
  Search,
  Swipe,
  SwipeItem,
  List,
  Popup,
  Sku,
  Stepper,
  Checkbox,
  CheckboxGroup,
  Card,
  SubmitBar,
  Toast,
  Tag,
  Col,
  Cell,
  CellGroup,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  ContactCard,
  ContactList,
  ContactEdit,
  NoticeBar,
  CouponCell,
  CouponList,
  Badge,
  BadgeGroup
} from 'vant'

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(Icon)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(List)
  .use(Popup)
  .use(Sku)
  .use(Stepper)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Card)
  .use(SubmitBar)
  .use(Toast)
  .use(Tag)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn)
  .use(ContactCard)
  .use(ContactList)
  .use(ContactEdit)
  .use(NoticeBar)
  .use(CouponCell)
  .use(CouponList)
  .use(Badge)
  .use(BadgeGroup)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})


