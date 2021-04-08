<template>
  <div class="setTing">
    <van-cell-group class="user-group" @click="addressManage()">
      <van-cell title="地址管理" value="" is-link/>
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell title="账户与安全" value="密码/支付等管理" is-link/>
      <van-cell title="支付设置" value="" is-link/>
      <van-cell title="增票资质" value="添加增票资质" is-link/>
      <van-cell title="我的档案" value="添加汽车/宝宝等档案" is-link/>
      <van-cell title="我的定制" value="定制个性化卡片" is-link/>
      <van-cell title="通用" value="清除本地缓存等" is-link/>
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell title="PLUS会员" value="每月领取100元优惠券" is-link/>
      <van-cell title="功能反馈" value="" is-link/>
      <van-cell title="关于HachiApp" value="V3.0.2" is-link/>
    </van-cell-group>

    <van-cell-group class="user-group" @click="backLogin()">
      <van-cell id="backLogin" title="退出登录" />
    </van-cell-group>

  </div>
</template>
<script>
  import { Row, Col, Icon, Cell, CellGroup  } from 'vant';
  export default {
    name: "SetTing",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data(){
      return {
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ],
        disabledList: [
          {
            id: '3',
            name: '王五',
            tel: '1320000000',
            address: '浙江省杭州市滨江区江南大道15号'
          }
        ]
      }
    },
    methods: {
      addressManage(){
        this.$router.push({
          name:"Address"
        })
      },
      backLogin(){
        this.$dialog.confirm({
          message: '确认退出登录吗？'
        }).then(function(){
          //
        }).catch(function(){
          //
        });
      }
    }
  };
</script>
<style scoped>
  .user-group {
    margin-bottom: 10px;
  }

  .van-cell.van-cell--clickable {
    border-bottom: 1px solid #eeeeee
  }

  .van-cell__title {
    text-align: left;
  }

  #backLogin .van-cell__title{
    text-align: center!important;
  }
</style>
