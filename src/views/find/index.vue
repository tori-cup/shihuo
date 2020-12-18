<template>
  <div id="find">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-tree-select
      height="160vw"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="onChange"
    >
      <template #content>
        <div v-if="active === 0" id="recommend">
          <div
            class="recommend"
            v-for="item in recommend"
            :key="item.gc_id"
            @click="gotodetail(item, item.gc_name)"
          >
            <img :src="item.gc_image" alt="" />
            <p>{{ item.gc_title }}</p>
          </div>
        </div>
        <!-- 惊喜推荐 -->
        <div v-if="active === 1" class="subnav">
          <div class="subnav_list" v-for="item in list1" :key="item.gc_id">
            <h4 class="sub_title">{{ item.gc_name }}</h4>
            <div
              class="third_list"
              v-for="item1 in item.child"
              :key="item1.gc_id"
            >
              <img :src="item1.gc_image" alt="" />
              <p>{{ item1.gc_name }}</p>
            </div>
          </div>
          <div class="subbottom"></div>
        </div>

        <!--  -->
      </template>
    </van-tree-select>
    <router-view />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { Notify } from 'vant';
export default {
  data() {
    return {
      activeKey: 0,
      active: 0,
      items: [
        { text: '推荐' },
        { text: '惊喜推荐' },
        { text: '时尚女装' },
        { text: '品牌男装' },
      ],
      recommend: [],
      list1: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 点击左侧哪个 显示索引
    onChange(index) {
      console.log(index);
      if (index === 1) {
        this.$http
          .get(
            'https://pcw.ehmall.com.cn/mobile/index.php?act=goods_class&op=getChildByFirstId&firstid=215&api_time=1608214259&comefrom=WAP&key=&api_sign=3eab0e9e7fb25578f5cefc386f65dd40'
          )
          .then((res) => {
            console.log(res);
            console.log(res.data.datas.goods_class);
            this.list1 = res.data.datas.goods_class;
          });
      }
    },
    // 点击返回首页
    onClickLeft() {
      this.$router.push('/homepage');
    },
    onClickRight() {
      Toast('按钮');
    },
    // gotodetail(item, item.gc_name)
    gotodetail(item, name) {
      console.log(item, name);
    },
  },
  created() {
    this.$http
      .get(
        'https://pcw.ehmall.com.cn/mobile/index.php?act=goods_class&op=getChildByRecommend&api_time=1608213146&comefrom=WAP&key=&api_sign=4477b096d05508f9be87442a41e67417'
      )
      .then((res) => {
        this.recommend = res.data.datas.goods_class;
      });
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

<style lang="scss" scoped>
#find {
  .van-sidebar {
    // height: 100%;
    text-align: center;
    .van-sidebar-item {
      // width: 20px;
    }
  }
  #recommend {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .recommend {
      width: 33%;
      height: 100px;
      text-align: center;
      margin: 10px 0;
      img {
        display: inline-block;
        height: 70px;
      }
      p {
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .subnav {
    .subnav_list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .sub_title {
        width: 100%;
        height: 30px;
      }
      h4 {
        font-weight: 500;
        border-bottom: 1px solid #d39376;
        height: 30px;
        line-height: 30px;
      }
      .third_list {
        width: 33%;
        height: 100px;
        text-align: center;
        margin: 10px 0;
        img {
          display: inline-block;
          height: 70px;
        }
        p {
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
  .subbottom {
    width: 100%;
    height: 50px;
  }
}
</style>
