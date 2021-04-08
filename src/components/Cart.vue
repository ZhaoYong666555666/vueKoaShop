<template>
  <div class="cart">
    <van-checkbox-group class="card-goods" id="cardGoods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="(item,index) in goods"
        v-model="checkedGoods[item]"
        @click="singleClick(item)"
        :key="item"
        :name="item"
      >
        <van-card
          :num="item.num"
          :tag="item.tag"
          :price="formatPrice(item.price,item.num)"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.thumb"
          origin-price="10.00"
        >
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
    <!--简单用法-->
    <!--<van-submit-bar id="submitBar"-->
      <!--:price="totalPrice"-->
      <!--:disabled="!checkedGoods.length"-->
      <!--:button-text="submitBarText"-->
      <!--@submit="onSubmit"-->
    <!--/>-->
    <!--高级用法-->
    <van-submit-bar  id="submitBar"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      button-text="提交订单"
      @submit="onSubmit"
    >
    <van-checkbox v-model="allChecked" @click="allClick(allChecked)">全选</van-checkbox>
      <span slot="tip">
        你的收货地址不支持同城送, <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
  export default {
    name:"Cart",
    data() {
      return {
        valueNum:0,
        allChecked:false,
        checkedGoods: [],
        goods: []
      };
    },
    mounted(){
      this.checkedInit();
      this.$nextTick(function(){
        var appHeight = document.body.offsetHeight ;
        var cardGoods = document.getElementById("cardGoods");
        var tabBar = document.getElementById("tabBar");
        var submitBar = document.getElementById("submitBar");
        cardGoods.style.height = (appHeight - tabBar.offsetHeight - submitBar.offsetHeight) + "px";
      })
    },
    computed: {
      submitBarText() {
        const count = this.checkedGoods.length;
        return '结算' + (count ? `(${count})` : '');
      },
      totalPrice() {
        return this.goods.reduce((total,item) => total + (this.checkedGoods.indexOf(item) !== -1 ? (item.price*item.num) : 0), 0);
      }
    },
    methods: {
      checkedInit(){
        //获取本地存储的订单
        if(localStorage.getItem("orderList")){
          this.goods = JSON.parse(localStorage.getItem("orderList"));
        }
        console.log(this.goods )
        for(var i = 0;i< this.goods.length;i++){
          this.checkedGoods.push(this.goods[i])
        }
        if(this.checkedGoods.length == this.goods.length){
          this.allChecked = true;
        }else{
          this.allChecked = false;
        }
      },
      //单选
      singleClick(){
        if(this.checkedGoods.length == this.goods.length){
          this.allChecked = true;
        }else{
          this.allChecked = false;
        }
      },
      //全选
      allClick(isTrue){
        //反选
        this.checkedGoods = [];
        if(isTrue){
          //全选
          for(var i = 0;i < this.goods.length;i++){
            this.checkedGoods.push(this.goods[i]);
          }
        }else{
          //反选
          this.checkedGoods = [];
        }
        this.singleClick();
      },
      //价格换算
      formatPrice(price,num) {
        return ((price / 100) * num).toFixed(2);
      },
      onSubmit() {
        //this.$toast("提交订单");
        this.$router.push({
          name:"OrderPage",
          params:{num:666}
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  #cardGoods{
    overflow: auto;
  }

  .cart{
    background: white;
  }

  .van-submit-bar__bar{
    padding-left:20px!important;
    box-sizing: border-box;
  }

  .van-cell.van-panel__header{
    margin-bottom:10px;
  }

  .van-submit-bar{
    bottom:50px!important;
    border-bottom:1px solid #cccccc;
    box-sizing: border-box;
  }

  .card-goods {
    background-color: #fff;
    &__item {
       position: relative;
       background-color: #fafafa;
        .van-checkbox__label {
          width: 100%;
          height: auto;
          padding: 0 10px 0 15px;
          box-sizing: border-box;
        }
        .van-checkbox__icon {
          top: 50%;
          left: 10px;
          z-index: 1;
          position: absolute;
          margin-top: -10px;
        }
        .van-card__price {
          color: #f44;
        }
      }
  }
</style>
<!--this.goods = [{-->
<!--id: '1',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"热卖",-->
<!--num: 3,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '2',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"打折",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '3',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"畅销",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '4',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"甩楼价",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '5',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"白菜价",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '6',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"热卖",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '7',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"买一送一",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '8',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"畅销",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--},{-->
<!--id: '9',-->
<!--title: '陕西蜜梨',-->
<!--desc: '约600g',-->
<!--price: 690,-->
<!--tag:"你敢买我敢送",-->
<!--num: 1,-->
<!--thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'-->
<!--}]-->
