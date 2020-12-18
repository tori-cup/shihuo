<template>
  <div id="register" :class="addclassname">
    <van-form @submit="onSubmit">
      <!-- 头像 -->
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        :max-count="1"
        round
      ></van-uploader>
      <p class="uploadimg">上传头像</p>
      <!-- 文本 -->
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <Three @upload="upload" :showcityflag="showcityflag" :showcity="city">
      </Three>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Three from '@/components/cinemathree2.vue';
import { getToken, setToken, removeToken } from '../../../util/cookie';
import { Toast } from 'vant';
export default {
  data() {
    return {
      // 判断是否登陆
      hasLogin: getToken() || '',
      oldusername: '',
      username: '',
      password: '',
      _id: '',
      // 图片
      fileList: [{ url: '' }],
      addclassname: '', // 遮罩层
      city: '', // 城市名
      imgurlUpload: '',
      // 注册
      area: '',
      // 展示城市
      showcityflag: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取用户信息
    getuserinfo: async function() {
      await this.$http
        .post('http://121.5.57.144:8000/userdetail', {
          username: this.oldusername,
        })
        .then((res) => {
          console.log(res.data.result);
          var userinfo = res.data.result;
          console.log(userinfo[0].imgurl);
          this.fileList[0].url =
            'http://121.5.57.144:8000/' + userinfo[0].imgurl;
          this.password = userinfo[0].password;
          this._id = userinfo[0]._id;
          this.city = userinfo[0].area;
          // 如果没有上传图片 默认显示系统图片
          if (this.fileList[0].url === 'http://121.5.57.144:8000/') {
            this.fileList[0].url =
              '//sh1.hoopchina.com.cn/fis_static/shihuomobile/static/user/head_02977e3.png';
          }
        });
    },
    // 图片
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      setTimeout(() => {
        file.status = 'done ';
        file.message = '上传成功';
      }, 1000);
      console.log(file);
      let img = new FormData();
      img.append('avatar', file.file); //上传图片传递file.file
      this.$http
        .post('http://121.5.57.144:8000/upload', img, {
          headers: {
            enctype: 'multipart/form-data',
          },
        })
        .then((res) => {
          this.imgurl = res.data.path;
        });
    },
    // 展示用户
    showUser() {
      if (this.hasLogin) {
        // 判断已经登录，取到cookie转为数组，循环
        var arr = document.cookie.split(';');
        for (let i = 0; i < arr.length; i++) {
          var newarr = arr[i].split('=');
          // 不知为何 修改昵称后 'username'变为' username'
          console.log(1);
          if (newarr[0] === 'username') {
            this.oldusername = newarr[1];
            this.username = newarr[1];
            console.log(123);
          } else if (newarr[0] === 'username') {
            this.oldusername = newarr[1];
            this.username = newarr[1];
            console.log(321);
          }
        }
      }
    },
    // 提交
    onSubmit(values) {
      this.username = values.用户名;
      this.password = values.密码;
      console.log(this.username, this.password, this.oldusername);
      this.$http
        .post('http://121.5.57.144:8000/edit', {
          // 根据id更新用户信息 根据旧用户名判断 该用户可继续用旧用户名
          _id: this._id,
          oldusername: this.oldusername,
          editInfo: {
            imgurl: this.imgurl,
            username: this.username,
            password: this.password,
            area: this.area,
          },
        })
        .then((res) => {
          if (res.data.code === 20000) {
            Toast.success(res.data.msg);
            this.$router.push('/my/login');
          } else if (res.data.code === 20001) {
            Toast.fail(res.data.msg);
          }
        });
    },
    // 点击选择城市，添加遮罩层
    upload(payload) {
      this.addclassname = payload;
    },
  },
  created() {
    // 展示用户名
    this.showUser();
    // 获取用户信息
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
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  margin: auto;
}

// 图片
#register .van-uploader {
  display: block;
  position: relative;
  width: 100px;
  left: 50%;
  right: 50%;
  margin-left: -40px;
}
// img {
//   display: block;
//   position: absolute;
//   width: 100px;
//   top: 0;
//   left: 50%;
//   right: 50%;
//   margin-left: -40px;
// }

.uploadimg {
  width: 100px;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50px;
  text-align: center;
}

// 输入框
.van-cell {
  height: 68px;
}
</style>
