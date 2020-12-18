<template>
  <div id="myinfo">
    <div id="content1" v-if="hasLogin">
      <!-- 头像 -->
      <div>
        <van-image
          round
          style="width:100px;height:100px;position:relative; left:50%;right:50%;margin-left:-2.5rem;"
          :src="imgurl"
        />
      </div>
    </div>
    <div id="content2" v-if="hasLogin">
      <van-cell value="修改昵称" @click="editlogin" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">{{ username }}</span>
        </template>
      </van-cell>
      <van-cell
        value="退出登录"
        @click.native="loginout"
        is-link
        to="/my/login"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title"></span>
        </template>
      </van-cell>
    </div>
    <div id="btnLogin">
      未登录？
      <router-link to="/my/login" tag="button" class="btnLogin"
        >去登陆</router-link
      >
    </div>
  </div>
</template>

<script>
import Three from '@/components/cinemathree2.vue';
// Token
import { getToken, setToken, removeToken } from '../../../util/cookie';

// import { Toast } from 'vant';

import { Toast, MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      hasLogin: getToken() || '',
      username: '',
      classList: '',
      imgurl: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 修改
    editlogin() {
      this.$router.push({
        path: '/my/edit',
        query: {
          username: this.username,
        },
      });
      //   this.$messagebox({
      //     $type: 'prompt', // 弹窗类型
      //     title: '修改用户名称', // 弹窗标题
      //     message: '修改', // 弹窗内容
      //     showInput: true, // 是否显示输入框
      //     showCancelButton: true, // 是否显示取消按钮
      //     showConfirmButton: true, // 是否显示确定按钮
      //     confirmButtonText: '提交', // 确认按钮的文本
      //     inputValue: this.username, // 输入框的值
      //   }).then(({ value, action }) => {
      //     // 将新的输入框里的值更新到cookie，并调用展示
      //     document.cookie = `username=${value}`;
      //     this.showUser();
      //   });
    },
    // 展示用户
    showUser() {
      if (this.hasLogin) {
        // 判断已经登录，取到cookie转为数组，循环
        var arr = document.cookie.split(';');
        for (let i = 0; i < arr.length; i++) {
          var newarr = arr[i].split('=');
          // 不知为何 修改昵称后 'username'变为' username'
          if (newarr[0] === 'username') {
            this.username = newarr[1];
          } else if (newarr[0] === ' username') {
            this.username = newarr[1];
          }
        }
      } else {
        console.log(2);
      }
    },
    // 获取用户信息
    getuserinfo: async function() {
      await this.$http
        .post('http://121.5.57.144:8000/userdetail', {
          username: this.username,
        })
        .then((res) => {
          var userinfo = res.data.result;
          this.imgurl = 'http://121.5.57.144:8000/' + userinfo[0].imgurl;
          if (this.imgurl === 'http://121.5.57.144:8000/') {
            this.imgurl =
              '//sh1.hoopchina.com.cn/fis_static/shihuomobile/static/user/head_02977e3.png';
          }
        });
    },
    // 注销
    loginout() {
      removeToken();
      this.hasLogin = '';
      this.username = '';
      this.password = '';
      // 点击退出 切换登录状态为'未登录'
      this.$store.commit('edit');
    },
  },
  created() {
    this.showUser();
    this.getuserinfo();
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {
    Three,
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
}

// .content1 div {
//     width: 200px;
//     height: 100px;
//     background: red;
// }
#btnLogin {
  width: 100%;
  margin-top: 50px;
  text-align: center;
  .btnLogin {
    color: red;
    margin: auto;
  }
}
</style>
