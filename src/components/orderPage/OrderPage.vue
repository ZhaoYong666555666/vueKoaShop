<template>
  <div class="orderPage">
    <van-card
      v-for="(item,index) in goods"
      :key="index"
      :num="item.num"
      :price="item.price"
      :desc="item.desc"
      :title="item.title"
      :tag="item.tag"
      :thumb="item.thumb"
      origin-price="10.00"
      :centered="isCentered"
    />
    <!--优惠券-->
    <!-- 优惠券单元格 -->
    <van-coupon-cell id="paper"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <!--提交订单-->
    <van-submit-bar
      :price="totalMoney"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
  const coupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 200,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '2.0',
    unitDesc: '元'
  };
  export default({
    name: "orderPage",
    data(){
      return {
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        showList:false,
        totalMoney:0,
        isCentered:true,
        goods:[
          {
            num:21,
            price:11.99,
            desc:"2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男",
            title:"潮男服饰111",
            tag:"热卖",
            thumb:"https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          },{
            num:22,
            price:22.99,
            desc:"2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男",
            title:"潮男服饰222",
            tag:"热卖",
            thumb:"https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          },{
            num:23,
            price:33.99,
            desc:"2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男",
            title:"潮男服饰333",
            tag:"热卖",
            thumb:"https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          },{
            num:24,
            price:44.99,
            desc:"2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男",
            title:"潮男服饰444",
            tag:"热卖",
            thumb:"https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          },{
            num:25,
            price:55.99,
            desc:"2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男",
            title:"潮男服饰555",
            tag:"热卖",
            thumb:"https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
          }
        ]
      }
    },
    mounted(){
      this.totalMoneyFn();
    },
    methods:{
      //优惠券切换回调
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
        console.log(index)
        if(index != -1){
          this.totalMoney = this.totalMoneyFn() - this.coupons[index].value;
        }else{
          this.totalMoney = this.totalMoneyFn();
        }
      },
      //兑换优惠券回调
      onExchange(code) {
        console.log(code)
        this.coupons.push(coupon);
      },
      onSubmit(){
        this.$toast("提交订单");
      },
      totalMoneyFn(){
        //初始化总价格
        this.totalMoney = 0;
        for(var i = 0;i < this.goods.length;i++){
          this.totalMoney += this.goods[i]["price"] * this.goods[i]["num"]
        }
        return this.totalMoney;
      }
    }
  })
</script>
<style scoped>
  #paper{
    margin-top:10px
  }
</style>
