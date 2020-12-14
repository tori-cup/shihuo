<template>
  <div id="app">
    <!-- <van-nav-bar title="app" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar> -->
    <router-view></router-view>

    <van-tabbar v-model="active">
      <!-- to="/movie/main" -->
      <van-tabbar-item name="home" icon="home-o" @click='changeRouter'>电影</van-tabbar-item>
      <van-tabbar-item name="video-o" icon="video-o" to="/cinema">影院</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/ask">咨询</van-tabbar-item>
      <!-- 如果已登录 点击切换路由到/my -->
      <van-tabbar-item name="friends" icon="friends-o" to="/my" v-if="hasLogin">
        <!-- 已登录 -->
        <span>{{this.$store.state.hasLogin}}</span>
      </van-tabbar-item>
      <!-- 如果未登录 点击切换路由到/my/login -->
      <van-tabbar-item name="friends" icon="friends-o" to="/my/login" v-else>
        <!-- 未登录 -->
        <span>{{this.$store.state.hasLogin}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { getToken, setToken, removeToken } from "./util/cookie";

export default {
  data() {
    return {
      hasLogin: getToken() || "",
      active: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: "喵喵电影",
    },
  },
  computed: {},
  watch: {
    // 监听路由变化
    "$route.path": function(newVal, oldVal) {
      // console.log(newVal + "---" + oldVal);
      // 保存当前路由
      localStorage.setItem('nowrouter', newVal);
    },
  },
  methods: {
    changeRouter() {
      // 判断当前路由，如果是首页四个子路由下的非main路由，不做任何操作，否则跳转到/movie/main
      var nowrouter = localStorage.getItem('nowrouter')
      if (nowrouter === "/movie/round" || nowrouter === "/movie/say" || nowrouter === "/movie/people") {
        // this.$router.push("/movie")
        console.log(1)
      } else {
        this.$router.push("/movie/main")
      }
    },
    // 返回上一步
    onClickLeft() {
      this.$router.back(-1)
      Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
    },
  },
  created() {
    // 如果已登录过，显示已登录
    if (this.hasLogin) {
      this.$store.commit('login');
    }
  },
  mounted() { },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  components: {},
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
