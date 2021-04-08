<template>
  <div class="leftList">
    <!--<ul id="list">-->
      <!--<li v-for="(item,index) in lists" :class="selectedLiId == item.id ? selectedLi : noSelectedLi" :id="item.id"-->
          <!--@click="searchGoods(item.id)">-->
        <!--{{item.name}}-->
      <!--</li>-->
    <!--</ul>-->
    <van-badge-group id="list" :active-key="activeKey" @change="onChange">
      <van-badge v-for="(item,index) in lists" :title="item.name" :key="item.id" @click="vanClick(item.id)"/>
    </van-badge-group>
  </div>
</template>
<script>
  import axios from "axios";
  import bus from "../../assets/eventBus";
  export default {
    name: 'LeftList',
    //接收父组件的值
    props: ["lists"],
    data(){
      return {
        liftList: [],
        firstShowId: null,
        selectedLiId: null,
        selectedLi: "selectedLi",
        noSelectedLi: "noSelectedLi",
        activeKey: 0
      }
    },
    mounted(){
      //通过这里返回至之前点击的左侧列表位置
      console.log(88886666);
      var _this = this;
      setTimeout(function () {
        _this.firstFn();
      }, 100)
    },
    methods: {
      firstFn(){
        var _this = this;
        this.$nextTick(function () {
          console.log(_this.$props.lists);
          _this.searchGoods(_this.$props.lists[0]["id"]);
        });
      },
      //点击左侧列表方法一
      searchGoods(id){
        this.selectedLiId = id;
        bus.$emit("userEvent", id);
      },
      //点击左侧列表方法二
      onChange(key){
        this.activeKey = key;
      },
      vanClick(id){
        this.selectedLiId = id;
        bus.$emit("userEvent", id);
      }
    },
    destroyed(){
      //bus.$off("userEvent");
    }
  }
</script>
<style scoped>
  ul, li {
    list-style: none;
  }

  #list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: auto;
  }

  #list li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid white;
    box-sizing: border-box;
  }

  .selectedLi {
    background: white;
    border-left: 5px solid red;
  }

  .noSelectedLi {
    background: #eeeeee;
    border-left: none;
  }

  .van-badge{
    padding:15px 12px!important;
    border-bottom:1px solid #eeeeee
  }
</style>
