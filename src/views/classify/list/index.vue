<template>
  <div id="classify">
    <div class="classify">
      <ul
        v-infinite-scroll="getuserlist"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="40"
      >
        <li v-for="item in userlist" :key="item._id">
          <img id="img" :src="item.imgurl" />
          <p class="txt txt1">{{ item.username }}</p>
          <p class="txt txt2">{{ item.password }}</p>
          <p class="txt txt3">{{ item.area }}</p>
        </li>
      </ul>

      <div class="commondiv loading" v-if="!loading">
        <img id="img" src="../../../assets/loading.gif" /> 加载中....
      </div>
      <div class="commondiv showmore" v-if="showmore">没有更多数据了...</div>
    </div>
    <div>1</div>

    <router-link to="/classify/video" tag="button">点击</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: [],
      page: 1,
      pagesize: 6,
      loading: false,
      showmore: false,
      showloading: false,
      loading: false,
      base_url: 'http://121.5.57.144:8000/',
    };
  },
  computed: {},
  watch: {},
  methods: {
    getuserlist() {
      this.loading = true; //这个是控制能不能上拉
      // this.showloading = true; //这个是控制loading显示
      var start = (this.page - 1) * this.pagesize; //跳过多少条
      var end = this.pagesize; //查询多少条
      this.$http
        .get(`http://121.5.57.144:8000/users?start=${start}&end=${end}`)
        .then((res) => {
          console.log(res);
          this.showloading = false; //只要数据请求过来，不管是不是最后一页，都要关闭加载中
          var list = res.data.list;
          list.forEach((item) => {
            item.imgurl = this.base_url + item.imgurl;
          });
          this.userlist = this.userlist.concat(list);
          if (list.length < this.pagesize) {
            //没有更多数据了,也就是说最后一页
            this.loading = true;
            this.showmore = true; //最后一页要显示没有数据样子
          } else {
            this.page = this.page + 1; //有数据page+1可以上拉继续加载下一页
            this.loading = false; //还有数据那么开关要设成false
          }
        });
    },
  },
  created() {},
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
.commondiv {
  height: 40px;
  line-height: 40px;
  color: red;
  text-align: center;
}

#img {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
}

.txt {
  width: 60px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
}

.txt3 {
  width: 150px;
  height: 40px;
}

#content #classify {
  flex: 1;
  overflow: auto;
}

#classify ul {
  margin: 0 12px;
  overflow: hidden;
}

#classify ul li {
  height: 40px;
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}

#classify .pic_show {
  width: 64px;
  height: 90px;
}

#classify .pic_show img {
  width: 100%;
}

#classify .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}

#classify .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#classify .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#classify .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}

#classify .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}

#classify .btn_mall,
#classify .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

#classify .btn_pre {
  background-color: #3c9fe6;
}
</style>
