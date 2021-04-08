<template>
  <div class="rightGoods">
    <CartController v-for="(item,index) in goodsList" :key="index" :conLists="item"></CartController>
  </div>
</template>
<script>
  import axios from "axios";
  import bus from "../../assets/eventBus";
  import CartController from "@/components/controllerBtn/CartController"
  export default {
    name: 'RightGoods',
    data(){
      return {
        goodsId: null,
        goodsList: []
      }
    },
    components: {CartController},
    //接收父组件的值
    props: {
      goods: Object,
      required: true
    },
    mounted(){
      var _this = this;
      bus.$on("userEvent", function (id) {
        _this.goodsId = id;
        _this.$nextTick(function () {
          _this.goodsList = _this.goods[_this.goodsId];
          //console.log(_this.goods[_this.goodsId])
        })
      })
    },
    beforeDestroy(){
      bus.$off("userEvent");
    }
  }
</script>
<style scoped>

</style>
