<template>
  <div id="app">
    <router-view id="view"/>
    <van-tabbar id="tabBar" v-model="active" active-color="orange">
      <!--
      dot显示红点
      info="5" 显示有几个提示信息
      -->
      <van-tabbar-item icon="home-o" to="/home" @click.native="routerRefresh">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classtype" @click.native="routerRefresh">
        分类
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart" @click.native="routerRefresh">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mine" @click.native="routerRefresh">
        我的
        <!--<router-link to="/mine">我的</router-link>-->
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        active: 0
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        var _this = this;
        this.$nextTick(function () {
          var appHeight = document.body.offsetHeight ;
          var view = document.getElementById("view");
          var routerLink = document.getElementById("tabBar");
          view.style.height = appHeight - routerLink.offsetHeight + "px";
        })
      },
      //解决路由切换之后页面不刷新问题
      routerRefresh(){
        var _this = this;
        this.routerAlive = false;
        this.$nextTick(function () {
          _this.routerAlive = true;
          _this.init();
        })
      }
    },
    watch:{
      //监听路由的变化
      "$route"(to,from){
        console.log(to);
        console.log(from);
        console.log(to.path);
        console.log(from.path);
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #view{
    background: #eeeeee;
    height:100%
  }
</style>
