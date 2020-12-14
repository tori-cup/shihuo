<template>
  <div class="">
    <div class="divwrap" v-if="show">
      <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
    </div>
    <!--遮罩层-->
    <div class="blacks" v-if="show" @click="countermand"></div>
    <!--触发选择-->
    <div @click="choose" id="choose">
      <span>所在地区</span>
      <span v-if="city === ''">请选择</span>
      <span v-else>{{ city }}</span>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";

export default {
  components: { VDistpicker },
  name: "particular",
  data() {
    return {
      lxr: "",
      lxdh: "",
      show: false,
      //省市区
      province: "",
      city: "",
      area: "",
    };
  },
  props: ["ips"],
  methods: {
    //取消选择地区
    countermand: function() {
      this.show = false;
    },
    //打开选择地区
    choose: function() {
      this.show = true;
    },
    onChangeProvince1: function(a) {
      this.province = a.value;
      if (a.value == "台湾省") {
        this.show = false;
      }
    },
    onChangeCity: function(a) {
      this.city = a.value;
    },
    onChangeArea: function(a) {
      this.area = a.value;
      this.show = false;
      this.city = this.province + this.city + this.area;
      // 子传父
      this.$emit('city', this.city)
    },
  },
};
</script>

<style scoped>
/*遮罩层*/

.blacks {
  position: fixed;
  width: 100%;
  height: 50%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
}







/*省市区三级联动*/

.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}







/*外部*/

.divwrap>.distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}








/*头部*/

.divwrap>>>.address-header {
  background: #fff;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  padding: 0;
  margin: 0;
}












/*头部内容*/


/* 头部li 省市区 */

.divwrap>>>.address-header ul li {
  /* flex-grow: 1; */
  width: 100px;
  color: #52697f;
  text-align: center;
  padding: 0;
}












/*选择过省市区的头部*/

.divwrap>>>.address-header .active {
  width: 36px;
  border-bottom: #52697f solid 3px;
}









/*内容部分*/

.divwrap>>>.address-container {
  overflow: scroll;
  height: 100%;
}


/*点过的地区内容*/

.divwrap>>>.address-container .active {
  color: red;
}



/* choose */

#choose {
  display: flex;
  justify-content: space-around
}
</style>