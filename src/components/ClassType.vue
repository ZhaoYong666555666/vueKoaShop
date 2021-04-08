<template>
  <div class="classType">
    <LeftList id="leftList" :lists="leftList"></LeftList>
    <RightGoods id="rightGoods" :goods="rightList"></RightGoods>
  </div>
</template>

<script>
  import axios from "axios"
  import LeftList from "@/components/leftList/LeftList"
  import RightGoods from "@/components/rightGoods/RightGoods"
  export default {
    name: 'ClassType',
    components: {LeftList,RightGoods},
    data () {
      return {
        leftList: [],
        rightList: {},
        loading: true,
        finished: true
      }
    },
    mounted(){
      this.init();
      this.heightFn();
    },
    methods: {
      init(){
        var _this = this;
        axios.get("../../static/classType.json")
          .then(function (data) {
            console.log(data);
            _this.leftList = data.data.data.categories;
            _this.rightList = data.data.data.products;
            console.log(_this.rightList)
          })
      },
      heightFn(){
        this.$nextTick(function () {
          var app = document.body;
          var routerLink = document.getElementById("tabBar");
          var leftList = document.getElementById("leftList");
          var rightGoods = document.getElementById("rightGoods");
          leftList.style.height = app.offsetHeight - routerLink.offsetHeight + "px";
          rightGoods.style.width = app.offsetWidth - leftList.offsetWidth + "px";
          rightGoods.style.height = app.offsetHeight - routerLink.offsetHeight + "px";
        })
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

  #leftList {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    text-align: center;
    border-right: 1px solid white;
    box-sizing: border-box;
    overflow: auto;
  }

  #rightGoods {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    box-sizing: border-box;
    overflow: auto;
  }
</style>
