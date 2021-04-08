<template>
  <div class="mine">
    <van-icon name="setting-o" id="setTing" @click="setTingManage" />
    <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <van-notice-bar
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      left-icon="volume-o"
    />
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="balance-list-o" />
        我的订单
      </van-col>
      <van-col span="6">
        <van-icon name="coupon-o" />
        优惠券
      </van-col>
      <van-col span="6">
        <van-icon name="pending-payment" />
        我的钱包
      </van-col>
      <van-col span="6">
        <van-icon name="question-o" />
        帮助中心
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  export default {
    name:"Mine",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    methods:{
      setTingManage(){
        this.$router.push({
          name:"SetTing"
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .user-links{
    margin-bottom:10px;
  }

  #setTing{
    position: fixed;
    top:10px;
    right:10px;
    font-size: 22px;
  }

  .user {
    &-poster {
       width: 100%;
       display: block;
     }
    &-group {
       margin-bottom: 15px;
     }
    &-links {
         padding: 15px 0;
         font-size: 12px;
         text-align: center;
         background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
</style>
