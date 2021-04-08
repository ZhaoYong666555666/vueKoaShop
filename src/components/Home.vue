<template>
  <div class="home">
    <form action="/" id="searchForm">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div id="wrap">
      <van-swipe :autoplay="2000" @change="onChange" indicator-color="orange">
        <van-swipe-item v-for="(image,index) in images" :key="index" @click="onSwipeItemClick(index)">
          <img :src="image.imgUrl">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div v-tack="400">我是随机的</div>
  </div>
</template>

<script>
    import axios from "axios";
    import Vue from 'vue';

    Vue.directive('tack', {
        bind(el, binding) {
            console.log(el);
            console.log(binding);
            el.style.background = 'gold';
            el.style.position = 'absolute';
            el.style.top = binding.value + 'px';
        }
    });
    export default {
        name: 'Home',
        data() {
            return {
                value: 'Welcome to Your Home',
                images: [
                    "https://img.yzcdn.cn/2.jpg",
                    "https://img.yzcdn.cn/2.jpg",
                    "https://img.yzcdn.cn/2.jpg"
                ]
            }
        },
        created() {
            // 这个阶段获取不到$el和$data

        },
        mounted() {
            console.log(this.$el);
            console.log(this.$data);
            this.init();
            var appHeight = document.body.offsetHeight;
            var wrap = document.getElementById("wrap");
            var searchForm = document.getElementById("searchForm");
            var tabBar = document.getElementById("tabBar");
            wrap.style.height = appHeight - searchForm.offsetHeight - tabBar.offsetHeight + "px";
        },
        methods: {
            init() {
                var _this = this;
                axios.get("../../static/homeSwiper.json")
                    .then(function (data) {
                        console.log(data)
                        _this.images = data.data;
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            //搜索的回车事件
            onSearch() {
                console.log("搜索")
            },
            //点击搜索的取消时间
            onCancel() {
                console.log("退出")
            },
            //轮播图的change时间
            onChange(index) {
//        console.log("当前Swipe索引" + index)
            },
            onSwipeItemClick(index) {
//        console.log("轮播图的点击事件" + index)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  #wrap {
    overflow: auto;
  }

  .van-swipe {
    margin-bottom: 10px !important;
  }

  .van-swipe-item {
    height: 240px !important;
  }

  .van-swipe-item img {
    width: 100% !important;
    height: 100% !important;
  }
</style>
