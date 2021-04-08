import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ClassType from '@/components/ClassType'
import Cart from '@/components/Cart'
import Mine from '@/components/Mine'
import GoodsDetail from '@/components/rightGoodsDetail/GoodsDetail'
import OrderPage from '@/components/orderPage/OrderPage'
import SetTing from '@/components/setTing/SetTing'
import Address from '@/components/address/Address'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: Home
    },
    {
      path: '/classtype',
      name: 'ClassType',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: ClassType
    },
    {
      path: '/cart',
      name: 'Cart',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: Cart
    },
    {
      path: '/mine',
      name: 'Mine',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: Mine
    },
    {
      path: '/goodsDetail',
      name: 'GoodsDetail',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: GoodsDetail
    },
    {
      path: '/orderPage',
      name: 'OrderPage',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: OrderPage
    },
    {
      path: '/setTing',
      name: 'SetTing',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: SetTing
    },
    {
      path: '/address',
      name: 'Address',
      meta: {
        keepAlive: true //需要被缓存
      },
      component: Address
    }
  ]
})

/*const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/classtype',
      name: 'ClassType',
      component: ClassType
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/goodsDetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/orderPage',
      name: 'OrderPage',
      component: OrderPage
    },
    {
      path: '/setTing',
      name: 'SetTing',
      component: SetTing
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (from.path.indexOf('/home') < 0) {
    sessionStorage.setItem('preToHomePath', from.path);
  }
});
export default router*/
