<template>
  <div class="goodsDetail">
    <van-icon name="arrow-left" @click="goBack()"/>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goodsInfo.thumb" :key="thumb">
        <img :src="thumb">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goodsInfo.title }}</div>
        <div class="goods-price">{{ formatPrice(goodsInfo.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goodsInfo.express }}</van-col>
        <van-col span="14">剩余：{{ goodsInfo.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">Hachi的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry"/>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="选择商品规格" is-link @click="goodsDetail(detailObj)"/>
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat-o" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="sorry">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="sorry">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <!--Sku层-->
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :quota="quota"
      :quota-used="quotaUsed"
      :reset-stepper-on-hide="resetStepperOnHide"
      :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
      :close-on-click-overlay="closeOnClickOverlay"
      :disable-stepper-input="disableStepperInput"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
  export default {
    name: "GoodsDetail",
    data() {
      return {
        goodsInfo: {
          title: '美国伽力果（约680g/3个）',
          price: 2680,
          express: '免运费',
          remain: 19,
          thumb: [
            'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
            'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
          ]
        },
        detailObj:{},
        //Sku层
        showBase: false,
        goodsId:1,    //商品id
        quota:10,    //限购数量
        quotaUsed:0, //已购买过的属相
        resetStepperOnHide:false,         //隐藏时种植选择的商品数量
        resetSelectedSkuOnHide:false,     //隐藏时重置已选择的Sku
        closeOnClickOverlay:true,        //是否在点击蒙层后关闭
        disableStepperInput:false,        //是否禁用步进器输入
        goods: {
          // 商品标题
          title: '默认商品',
          // 默认商品 sku 缩略图
          picture: 'https://img.yzcdn.cn/1.jpg'
        },
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '颜色', // skuKeyName：规格类目名称
              v: [
                {
                  id: '30349', // skuValueId：规格值 id
                  name: '红色', // skuValueName：规格值名称
                  imgUrl: 'https://img.yzcdn.cn/2.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                },
                {
                  id: '1215',
                  name: '蓝色',
                  imgUrl: 'https://img.yzcdn.cn/2.jpg'
                }
              ],
              k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 15 // 当前 sku 组合对应的库存
            },
            {
              id: 2259, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 10 // 当前 sku 组合对应的库存
            }
          ],
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              // 商品留言
              datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: '留言', // 留言名称
              type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              required: '1' // 是否必填 '1' 表示必填
            }
          ],
          hide_stock: false // 是否隐藏剩余库存
        },
        messageConfig:{
          // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
          uploadImg() {
            return new Promise(function(resolve){
              setTimeout(function(){
                resolve('https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg')
              },1000)
            })
//            return new Promise((resolve) => {
//              setTimeout(() => resolve('https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'), 1000);
//            })
          },
          // 最大上传体积 (MB)
          uploadMaxSize: 3,
          // placehold配置
          placeholderMap: {
            text: 'xxx',
            tel: 'xxx'
          }
        }
      };
    },
    mounted(){
      var _this = this;
      this.$nextTick(function(){
        //有问题，没有获取到这个由父级传过来的参数
        console.log(_this.$route.params.goodsDetail);
        _this.detailObj = _this.$route.params.goodsDetail;
        var obj = _this.$route.params.goodsDetail;
        console.log(obj["price"])
        _this.goodsInfo.title = obj["long_name"];
        _this.goodsInfo.price = obj["price"];
        _this.goodsInfo.remain = obj["product_num"];
      })
    },
    methods: {
      //Sku层开始,方式二
      goodsDetail(obj){
        this.showBase = true;
        console.log(obj);
        this.goods.title = obj["long_name"];
        this.goods.picture = obj["app_mimg"];
      },
      //购买
      onBuyClicked(){

      },
      //加入购物车
      onAddCartClicked(){

      },
      //Sku层结束
      formatPrice() {
        return '¥' + (this.goodsInfo.price * 100 / 100).toFixed(2);
      },
      onClickCart() {
        this.$router.push('cart');
      },
      sorry() {
        let _this = this;
        /**
         * 通过this.$toast调用
         * */
        //普通用法
        //this.$toast('暂无后续逻辑~');

        //高级用法
        const toast = this.$toast.loading({
          duration:0,   //持续展示toast
          forbidClick:true, //禁用背景点击
          loadingType:"spinner",
          message:"倒计时3秒"
        });
        let second = 3;
        const timer = setInterval(function(){
          second--;
          if(second){
            toast.message = `倒计时${second}秒`;
          }else{
            clearInterval(timer);
            _this.$toast.clear();
          }
        },1000)
      },
      //返回上一层
      goBack(){
        this.$router.push({
          name:"ClassType"
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .van-goods-action{
    z-index: 100!important;
  }

  .van-icon-arrow-left{
    position: absolute;
    left:10px;
    top:10px;
    z-index: +10000;
    font-size: 30px;
    color: white;
  }

  .goods {
    padding-bottom: 50px;
    &-swipe {
      img {
        width: 100%;
        display: block;
      }
    }
    & -title {
      font-size: 16px;
    }
    &-price {
      color: #f44;
    }
    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }
    &-cell-group {
      margin: 15px 0;
      .van-cell__value {
        color: #999;
      }
    }
    &-tag {
      margin-left: 5px;
    }
  }
</style>
