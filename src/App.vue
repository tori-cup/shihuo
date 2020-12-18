<template>
  <div id="app">
    <!-- ss -->
    <!-- <van-nav-bar
      title="app"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> -->
    <router-view></router-view>

    <van-tabbar v-model="active" v-if="this.$store.state.footerFlag">
      <!--  v-if="this.$store.state.searchflag" -->
      <!-- to="/homepage/main" -->
      <!-- @click="changeRouter" -->
      <van-tabbar-item
        name="homepage"
        icon="home-o"
        to="/homepage/main"
        :class="addClassName1"
        ref="addClassName1"
      >
        首页
      </van-tabbar-item>

      <van-tabbar-item
        name="video-o"
        icon="video-o"
        to="/classify/list"
        :class="addClassName2"
        ref="addClassName2"
      >
        分类
      </van-tabbar-item>

      <van-tabbar-item
        name="search"
        icon="search"
        to="/find"
        :class="addClassName3"
        ref="addClassName3"
      >
        发现
      </van-tabbar-item>

      <van-tabbar-item
        name="cart-o"
        icon="search"
        to="/cart"
        :class="addClassName4"
        ref="addClassName4"
      >
        购物车
      </van-tabbar-item>

      <!-- 如果已登录 点击切换路由到/my -->
      <van-tabbar-item
        name="friends"
        icon="friends-o"
        to="/my/info"
        v-if="hasLogin"
        :class="addClassName5"
        ref="addClassName5"
      >
        <!-- 已登录 -->
        <span>{{ this.$store.state.hasLogin }}</span>
      </van-tabbar-item>

      <!-- 如果未登录 点击切换路由到/my/login -->
      <van-tabbar-item
        name="friends"
        icon="friends-o"
        to="/my/login"
        v-else
        :class="addClassName5"
        ref="addClassName5"
      >
        <!-- 未登录 -->
        <span>{{ this.$store.state.hasLogin }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { getToken, setToken, removeToken } from './util/cookie';

export default {
  data() {
    return {
      hasLogin: getToken() || '',
      active: 0,
      isActive: 0,
      addClassName1: '',
      addClassName2: '',
      addClassName3: '',
      addClassName4: '',
      addClassName5: '',
      // searchflag: ,
    };
  },
  props: {
    title: {
      type: String,
      default: '喵喵电影',
    },
  },
  computed: {},
  watch: {
    // 监听路由变化
    '$route.path': function(newVal, oldVal) {
      // console.log(newVal + "---" + oldVal);
      // 保存当前路由 van-tabbar-item--active
      localStorage.setItem('nowrouter', newVal);
      var str = String(localStorage.getItem('nowrouter'));
      console.log(str);
      // var arr = [
      //   this.addClassName1,
      //   this.addClassName2,
      //   this.addClassName3,
      //   this.addClassName4,
      //   this.addClassName5,
      // ];
      this.addClassName1 = '';
      this.addClassName2 = '';
      this.addClassName3 = '';
      this.addClassName4 = '';
      this.addClassName5 = '';
      var homepage = str.substring(0, 9);
      var classify = str.substring(0, 9);
      var find = str.substring(0, 5);
      var cart = str.substring(0, 5);
      var my = str.substring(0, 3);

      if (homepage === '/homepage') {
        this.addClassName1 = 'van-tabbar-item--active';
      } else if (classify === '/classify') {
        this.addClassName2 = 'van-tabbar-item--active';
      } else if (find === '/find') {
        this.addClassName3 = 'van-tabbar-item--active';
      } else if (cart === '/cart') {
        this.addClassName4 = 'van-tabbar-item--active';
      } else if (my === '/my') {
        this.addClassName5 = 'van-tabbar-item--active';
      }
      // console.log(this.$refs.addClassName3);
      // this.$refs.addClassName3.$el.className = 'aaa';
      // console.log(this.$refs.addClassName3.$el.className);
    },
  },
  methods: {
    changeRouter() {
      // 判断当前路由，如果是首页四个子路由下的非main路由，不做任何操作，否则跳转到/homepage/main
      var nowrouter = localStorage.getItem('nowrouter');
      if (
        nowrouter === '/homepage/round' ||
        nowrouter === '/homepage/say' ||
        nowrouter === '/homepage/people'
      ) {
        // this.$router.push("/homepage")
        console.log(1);
      } else {
        this.$router.push('/homepage/main');
      }
    },
    // 返回上一步
    onClickLeft() {
      this.$router.back(-1);
      Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
    },
    // 判断当前页面 点亮图标
    // switchmenu(current) {
    //   this.isActive = current;
    // }
  },
  created() {
    // 如果已登录过，显示已登录
    if (this.hasLogin) {
      this.$store.commit('login');
    }
    console.log(localStorage.getItem('nowrouter') === '/homepage/main');
    if (localStorage.getItem('nowrouter') === '/homepage/main') {
      this.$router.push('/homepage/main');
    }
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.switchActive {
  color: #f03d37;
}
</style>
