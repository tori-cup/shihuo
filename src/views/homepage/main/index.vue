<template>
  <div id="main">
    <!-- 头部 -->
    <div v-if="!searchflag">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @focus="onSearch"
        id="search"
        ref="search"
      >
        <template #action>
          <div @click="goLogin">
            <van-icon name="manager-o" />
          </div>
        </template>
      </van-search>

      <!-- 轮播 -->
      <van-swipe :autoplay="1000" class="slide">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <!-- 大分类导航 -->
      <van-grid :column-num="4" class="nav1">
        <van-grid-item icon="cart-circle" text="超市">
          <van-icon
            name="shop"
            color="#aaa"
            size="30px"
            tag="a"
            href="http://m.shihuo.cn/zhongce/newIndex#qk=qdhd"
          ></van-icon>
        </van-grid-item>
        <van-grid-item icon="cart-circle" text="热门">
          <van-icon
            name="fire"
            color="#1ac45d"
            size="30px"
            tag="a"
            href="http://m.shihuo.cn/column/columnHome?key=column_list_about&val=6,280,137,135,285,13,238,5,8#qk=sw"
          ></van-icon>
        </van-grid-item>
        <!--  -->
        <van-grid-item icon="cart-circle" text="礼物">
          <van-icon
            name="gift"
            color="#dac45d"
            size="30px"
            tag="a"
            href="http://m.shihuo.cn/column/columnHome?key=collect_article&val=sort_new#qk=zc"
          ></van-icon>
        </van-grid-item>
        <van-grid-item icon="cart-circle" text="数码">
          <van-icon
            name="service"
            color="#78acb0"
            size="30px"
            tag="a"
            href="http://m.shihuo.cn/column/columnHome?key=collect_article&val=sort_hot#qk=zc"
          ></van-icon>
        </van-grid-item>
      </van-grid>

      <!-- 小分类导航 -->
      <van-grid direction="horizontal" :column-num="2" class="nav2">
        <van-grid-item class="navtitle">
          <div>
            <h5>篮球</h5>
            纯白系列秒杀
          </div>
          <img
            src="http://shihuo.hupucdn.com/def/20181105/2355ddafee2bdc0963e346192576c3631541383761.jpg?imageView2/0/w/160/h/160/interlace/1"
            alt=""
          />
        </van-grid-item>
        <van-grid-item class="navtitle">
          <div>
            <h5>跑步</h5>
            女王节秒杀
          </div>
          <img
            src="http://shihuo.hupucdn.com/def/20180801/a580ec1affbbf4a344974bc92969c7671533133549.jpg?imageView2/0/w/160/h/160/interlace/1"
            alt=""
          />
        </van-grid-item>
        <van-grid-item class="navtitle">
          <div>
            <h5>健身</h5>
            布瑞特秒杀
          </div>
          <img
            src="http://shihuo.hupucdn.com/trade/reposition/2017-09-08/87e0cc9d598a9ec59fb82de142a7f801.png?imageView2/0/w/160/h/160/interlace/1"
            alt=""
          />
        </van-grid-item>
        <van-grid-item class="navtitle">
          <div>
            <h5>足球</h5>
            骑士
          </div>
          <img
            src="http://shihuo.hupucdn.com/def/20170913/5dc29f834528ddfaaf2c6e85769aa5451505294878.jpg?imageView2/0/w/160/h/160/interlace/1"
            alt=""
          />
        </van-grid-item>
      </van-grid>

      <!-- 优惠 团购 抽奖 -->
      <van-grid :gutter="5" class="nav3" :column-num="3">
        <van-grid-item class="navitem">
          <h3>今日优惠</h3>
          <p>EQT 5折好价</p>
          <img
            src="http://shihuo.hupucdn.com/appHome/201807/1811/1d039f64648d5e33025c747ec6420060.jpg?imageView2/2/w/120/h/120/interlace/1"
            alt="限时团购"
          />
        </van-grid-item>
        <van-grid-item class="navitem">
          <h3>限时团购</h3>
          <p>春节不打烊</p>
          <img
            src="http://shihuo.hupucdn.com/appHome/201802/0716/5d0eea37252cd190ba0975b3e5e1f49e.png?imageView2/2/w/120/h/120/interlace/1"
            alt="限时团购"
          />
        </van-grid-item>
        <van-grid-item class="navitem">
          <h3>免费抽奖</h3>
          <p>识货抽奖 天天免费</p>
          <img
            src="http://shihuo.hupucdn.com/kupload2018/2019715/15631798110000.jpeg?imageView2/2/w/120/h/120/interlace/1"
            alt="限时团购"
          />
        </van-grid-item>
      </van-grid>

      <!-- hotMove -->
      <div id="hotMove">
        <h3>热门活动</h3>
        <ul class="hotMove">
          <li>
            <a
              href="http://www.shihuo.cn/app/assets/youhui/1.0.2/brandSale.html"
            >
              <div class="img">
                <img
                  src="http://shihuo.hupucdn.com/appHome/201808/1710/5e683699826e2a13abd239e4e4e36793.jpg"
                  alt=""
                />
              </div>
              <p class="p1">skullcandy骷髅头耳机</p>
              <p class="p2">
                <span>券后低至89元起</span>
              </p>
            </a>
          </li>
          <li>
            <a href="http://www.shihuo.cn/article/detail/19901.html">
              <div class="img">
                <img
                  src="http://shihuo.hupucdn.com/appZone/201811/1214/2720301b13ee5c2b0003f78125b698ea.jpg"
                  alt=""
                />
              </div>
              <p class="p1">1000块包全身</p>
              <p class="p2">
                <span>不说虚话</span>
              </p>
            </a>
          </li>
          <li>
            <a href="http://t.shihuo.cn/m/422.html">
              <div class="img">
                <img
                  src="http://shihuo.hupucdn.com/appZone/201807/2411/b9541b36f94bfa8c6c51482e7536eb35.jpg"
                  alt=""
                />
              </div>
              <p class="p1">实战性价比之选</p>
              <p class="p2">
                <span>球星支线</span>
              </p>
            </a>
          </li>
          <li>
            <a href="http://www.shihuo.cn/article/detail/17634.html">
              <div class="img">
                <img
                  src="http://shihuo.hupucdn.com/appZone/201811/1216/32de94d3d483749627b0716d9cde722b.png"
                  alt=""
                />
              </div>
              <p class="p1">潮流圈的编辑们</p>
              <p class="p2">
                <span>Ta说</span>
              </p>
            </a>
          </li>
          <li>
            <a href="https://hupuyouxuan.taobao.com">
              <div class="img">
                <img
                  src="http://shihuo.hupucdn.com/appZone/201811/1019/7e5b5b66171686cf805178be1c793bf0.jpg"
                  alt=""
                />
              </div>
              <p class="p1">虎扑优选精英篮球袜</p>
              <p class="p2">
                <span>低至6.9元</span>
              </p>
            </a>
          </li>
          <li>
            <a href="http://t.shihuo.cn/m/533.html">
              <div class="img">
                <img
                  src="http://shihuo.hupucdn.com/appZone/201812/0411/e8dd17f83bc977f0d7014a077ed9d821.jpg"
                  alt=""
                />
              </div>
              <p class="p1">怎么穿，显高且有范</p>
              <p class="p2">
                <span>170+穿搭指南</span>
              </p>
            </a>
          </li>
        </ul>
      </div>

      <!--  -->
      <van-tabs v-model="active1" sticky>
        <van-tab title="推荐">
          <van-pull-refresh
            v-model="refreshing"
            @refresh="onRefresh"
            class="van-pull-refresh"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad1"
            >
              <van-cell v-for="(item, index) in shop1_title" :key="index">
                <div class="list">
                  <img :src="item.data.img" alt="" />
                  <div class="right">
                    <h3>{{ item.data.title }}</h3>
                    <div class="rightBot">
                      <img :src="item.data.avatar" alt="" />
                      <p>{{ item.data.author_name }}</p>
                    </div>
                  </div>
                </div>
              </van-cell>
              <van-cell v-for="(item, index) in shop1" :key="index">
                <div class="list" @click="goDetail(item.data.item_id)">
                  <img :src="item.data.img" alt="" />
                  <div class="right">
                    <h3 class="txt title">{{ item.data.title }}</h3>
                    <p class="txt intro">{{ '“' + item.data.intro + '”' }}</p>
                    <p class="txt price">{{ item.data.price }}</p>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="篮球">
          <van-pull-refresh
            v-model="refreshing"
            @refresh="onRefresh"
            class="van-pull-refresh"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad2"
            >
              <van-cell v-for="(item, index) in shop2" :key="index">
                <div class="list" @click="goDetail(item.data.item_id)">
                  <img :src="item.data.img" alt="" />
                  <div class="right">
                    <h3 class="txt title">{{ item.data.title }}</h3>
                    <p class="txt intro">{{ '“' + item.data.intro + '”' }}</p>
                    <p class="txt price">{{ item.data.price }}</p>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="跑步">2 </van-tab>
        <van-tab title="健身">3 </van-tab>
        <van-tab title="潮流">4 </van-tab>
      </van-tabs>
    </div>

    <div v-else>
      <van-search
        v-model="value"
        show-action
        left-icon="arrow-left"
        ref="search2"
      >
        <template #action>
          <div @click="goLogin">
            <van-icon name="search" />
          </div>
        </template>
      </van-search>
      <!-- <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight"></van-nav-bar> -->
    </div>
  </div>
</template>

<script>
var arr = [1];
import { Toast } from 'vant';
import { getToken, setToken, removeToken } from '../../../util/cookie';
import { getScroll, getScrollTop } from '../../../util/onscroll';

export default {
  data() {
    return {
      hasLogin: getToken() || '',
      images: [
        'http://shihuo.hupucdn.com/appHome/201812/0900/d31d0002502c7181c272e5bac796375e.jpg?imageView2/2/w/750/h/268/interlace/1',
        'http://shihuo.hupucdn.com/appHome/201901/0720/18cffc61c52a5ce61173479619bbaa6e.png?imageView2/2/w/750/h/380/interlace/1',
        'http://shihuo.hupucdn.com/appHome/201901/1010/5480e24dc886bde3fd4c599d22330d65.png?imageView2/2/w/750/h/380/interlace/1',
        'http://shihuo.hupucdn.com/appHome/201812/1023/736a64832b272c088c9fe01837b0ac4e.jpg?imageView2/2/w/750/h/268/interlace/1',
      ],
      searchtext: '羽绒服',
      value: '小米',
      // 搜索切换
      searchflag: false,
      // 导航
      active1: 0,
      active2: 0,
      // 标签1
      shop1: [],
      shop1_title: [],
      num1: 0, // 请求次数
      // 标签2
      shop_2: [],
      shop2: [],
      // 下拉加载
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      // 显示底部
      footerFlagGo: true,
      // 接口地址
      url: [
        'http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=&type=&channel_type=',
        'http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=&type=&channel_type=12',
        'http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=1595597045%3A3%3A&type=&channel_type=12',
        'http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=1593784130%3A4%3A&type=&channel_type=12',
        'http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=1592283900%3A5%3A&type=&channel_type=12',
        'http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=1591447834%3A6%3A&type=&channel_type=12',
      ],
    };
  },
  computed: {},
  watch: {
    '$route.path': function(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (localStorage.getItem('nowrouter') === '/homepage/search') {
        this.searchflag = true;
        // this.$store.commit('searchflag');
        this.$router.push('/homepage/search');
      } else if (localStorage.getItem('nowrouter') === '/homepage/main') {
        this.searchflag = false;
        // this.$store.commit("footerFlagGo"); //无效？
        this.value = '小米';
        // this.$store.commit('searchflag');
        this.$router.push('/homepage/main');
      } else if (localStorage.getItem('nowrouter') === '/homepage/search') {
        this.$store.commit('footerFlagOut');
      }
    },
  },
  methods: {
    // 搜索切换
    onSearch(val) {
      this.value = '';
      this.searchflag = true;
      this.$router.push('/homepage/search');
    },
    // 去登陆
    goLogin() {
      if (this.hasLogin) {
        this.$router.push('/my');
      } else {
        this.$router.push('/my/login');
      }
    },

    // 加载更多
    onLoad1() {
      // this.getroadList();
      this.num1++;
      this.$http.get(this.url[this.num1]).then((res) => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        var newshop1 = res.data.data.splice(1);
        this.shop1 = this.shop1.concat(newshop1);

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;
        if (this.shop1.length >= 100) {
          this.finished = true;
        }
      });
    },
    onLoad2() {},
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 详情页
    goDetail(id) {
      console.log(id);
      this.shop1.forEach((item, index) => {
        if (id === item.data.item_id) {
          this.$router.push({
            path: `/homepage/detail`,
            query: {
              shopitem: item,
            },
          });
        }
      });
    },
  },
  created() {
    // this.$store.commit('searchflag');
    // 获取商品列表
    this.$http.get(this.url[0]).then((res) => {
      this.shop1_title = res.data.data.splice(0, 1);
      this.shop1 = res.data.data.splice(1);
    });
    // this.$http({
    //     method:'post',
    //     url:'https://m.mi.com/v1/home/recommendBlank',
    //     // data:1,
    // }).then(res=>{
    //     console.log(res)
    // })
    this.$http
      .get(
        `http://m.shihuo.cn/homefis/getNews?pageSize=20&param_str=&type=basketball&channel_type=`
      )
      .then((res) => {
        this.shop2 = res.data.data;
        this.shop_2 = this.shop2;
      });
  },
  mounted() {
    // 进入首页显示home内容，否则只能点击后显示
    this.$router.push('/homepage/main');
  },
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

<style lang="scss" scoped>
.van-swipe {
  width: 100%;
  height: 200px;
}

img {
  width: 100%;
  height: 200px;
}

i {
  display: block;
  font-size: 20px;
}

#main {
  height: 2000px; // overflow: auto;
  .van-search {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .slide {
    margin-top: 54px;
    border-bottom: 10px solid #f7f7f7;
  }
  .nav1 {
    a {
      width: 25%;
    }
  }
  .nav2 {
    width: 100%;
    img {
      width: 20px;
      height: 20px;
    }
    .navtitle {
      width: 50%;
      height: 80px;
      position: relative;
      div {
        height: 80px;
        position: absolute;
        left: 0;
        padding-top: 20px;
        padding-left: 30px;
        height: 40px;
        text-align: left;
        font-size: 12px;
        h5 {
          font-size: 16px;
        }
      }
      img {
        display: block;
        width: 60px;
        height: 60px;
        position: absolute;
        right: 0;
      }
    }
  }
  .nav3 {
    height: 140px;
    background: #f7f7f7;
    padding: 10px 5px;
    display: flex;
    justify-content: space-around;
    .van-grid-item {
      ::v-deep.van-grid-item__content {
        padding: 0;
      }
    }
    img {
      display: block;
      width: 80px;
      height: 60px;
    }
    h3 {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
  #hotMove {
    height: 290px;
    border-bottom: 10px solid #f7f7f7;
    h3 {
      height: 25px;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 500;
    }
    .hotMove {
      height: 120px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      li {
        float: left;
        width: 30%;
        margin-bottom: 0.33333rem;
        display: list-item;
        text-align: -webkit-match-parent;
        list-style: none;
        margin-bottom: 10px;
        img {
          height: 80px;
        }
        .p1 {
          font-size: 14px;
          color: #000;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .p2 {
          font-size: 10px;
          color: #000;
        }
      }
    }
  }
  .van-pull-refresh {
    font-size: 30px;
    margin-bottom: 50px;
    ::v-deep.van-cell {
      // height: 100px;
    }
    .list {
      display: flex;
      img {
        width: 110px;
        height: 110px;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3 {
          font-size: 16px;
          width: 240px;
          font-weight: 500;
        }
        .rightBot {
          display: flex;
          justify-content: flex-start;
          img {
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
        p {
          width: 240px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
