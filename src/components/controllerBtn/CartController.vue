<template>
  <div class="cartController">
    <div class="goodsInfo" :id="conLists.id">
      <div class="goodsImg" @click="goodsDetail(conLists)"><img :src="conLists.app_mimg" alt=""></div>
      <div class="goodsRight">
        <div class="goodsDes">{{conLists.brand_name}}</div>
        <div class="goodsCon">
          <div class="miaoShu">
            <div class="product_num">剩余({{conLists.product_num}})</div>
            <div class="specifics">{{conLists.specifics}}</div>
            <div class="price">￥{{conLists.price}}</div>
          </div>
          <van-stepper
            v-model="goodsNum"
            async-change
            :min="0"
            :max="conLists.product_num"
            disable-input
            @change="onChange"
            @plus="onPlus(conLists)"
            @minus="onMinus(conLists)"
          />
        </div>
      </div>
    </div>
    <!--弹出层-->
    <van-popup position="top" v-model="isShow">{{isShowText}}</van-popup>

  </div>
</template>
<script>
  var orderList = [];
  import axios from "axios"
  export default({
    data(){
      return {
        goodsNum: 0,
        changing: false,
        isShow: false,
        isShowText: "",
        firstAdd: false,
        //添加至购物车的商品
        orderList: []
      }
    },
    //接收父组件的值
    props: {
      conLists: Object,
      required: true
    },
    mounted(){
      this.widthFn();
    },
    methods: {
      //点击跳转至详情,同Sku效果一样，方式一
      goodsDetail(obj){
        this.$router.push({
          name: "GoodsDetail",
          params: {goodsDetail: obj}
        });
      },
      //购买
      onBuyClicked(){

      },
      //加入购物车
      onAddCartClicked(){

      },
      //Sku层结束
      //进步器回调函数
      onChange(value){
        //console.log(value)
        var _this = this;
        if (this.changing) {
          return;
        }
        this.changing = true;
        axios.get("../../../static/classType.json")
          .then(function (data) {
            _this.goodsNum = value;
            _this.changing = false;
          });
      },
      onPlus(valueObj){
        console.log(valueObj)
//          id: '9',
//          title: '陕西蜜梨',
//          desc: '约600g',
//          price: 690,
//          tag:"你敢买我敢送",
//          num: 1,
//          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
        //摘取出来所选商品有用的字段
        var orderObj = {
          id: valueObj["id"],                     //商品id
          title: valueObj["banner_name"],         //商品名称
          thumb: valueObj["app_mimg"],            //商品图片
          price: valueObj["price"],               //商品单价
          num: 1,                                 //商品数量
          tag: "你敢买我敢送",
          desc: valueObj["specifics"]
        };
        if (this.goodsNum >= valueObj["product_num"]) {
          this.$toast("库存不足");
        } else {
          if (orderList.length > 0) {
            var isOk = false;
            for (var i = 0; i < orderList.length; i++) {
              //相同商品数量++
              if (orderObj["id"] == orderList[i]["id"]) {
                orderList[i]["num"]++;
                isOk = true;
                break;
              }
            }
            //不同商品直接加入到数组中
            if (!isOk) {
              orderList.push(orderObj);
            }
          } else {
            orderList.push(orderObj);
          }
        }
        localStorage.setItem("orderList", JSON.stringify(orderList));
        console.log(orderList);
      },
      onMinus(valueObj){
        var isOk = false;
        var deleteNum = null;
        for (var i = 0; i < orderList.length; i++) {
          if (valueObj["id"] == orderList[i]["id"]) {
            if (orderList[i]["num"] > 0) {
              orderList[i]["num"]--;
              if (orderList[i]["num"] == 0) {
                isOk = true;
                deleteNum = i;
              }
              break;
            }
          }
        }
        if (isOk) {
          orderList.splice(deleteNum, 1);
        }
        console.log(orderList);
        localStorage.setItem("orderList", JSON.stringify(orderList));
      },
      //加减按钮结束
      //初始化页面宽度
      widthFn(){
        this.$nextTick(function () {
          var rightGoods = document.getElementById("rightGoods");
          var allDom = document.getElementsByTagName("*");
          for (var i = 0; i < allDom.length; i++) {
            if (allDom[i].className == "goodsRight") {
              allDom[i].style.width = rightGoods.offsetWidth - 102 + "px";
            }
          }
        })
      }
    }
  })
</script>
<style scoped>
  .goodsInfo {
    width: 100%;
    height: 100px;
    background: white;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee
  }

  .goodsImg {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    float: left;
    border-right: 1px solid #eee;
    box-sizing: border-box;
  }

  .goodsRight {
    float: left;
  }

  .goodsImg img {
    width: 100%;
  }

  .goodsDes {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: left;
  }

  .goodsCon {
    height: 70px;
    line-height: 70px;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: right;
    position: relative;
  }

  .miaoShu {
    width: 80px;
    text-align: left;
    position: absolute;
    left: 10px;
    bottom: 0;
    line-height: 20px;
  }

  .miaoShu div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .specifics {
    color: #cecece
  }

  .price {
    color: red;
    font-weight: bold;
  }

  .product_num {
    font-size: 12px;
  }

  .van-button--mini {
    height: 20px !important;
    min-width: 20px !important;
    line-height: 20px !important;
    margin-top: 45px !important;
  }
</style>
