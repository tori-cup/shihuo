<template>
    <div id="register" :class="addclassname">
        <van-form @submit="onSubmit">
            <!-- 头像 -->
            <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" round/>
            <p class="uploadimg">上传头像</p>
            <!-- 文本 -->
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <Three @upload="upload" @city="getCity"></Three>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Three from "@/components/cinemathree2.vue";
import { Toast } from 'vant';
export default {
    data() {
        return {
            username: '',
            password: '',
            // 图片
            fileList: [],
            addclassname: "", // 遮罩层
            city: "", // 城市名
            imgurlUpload: '',
            // 注册
            imgurl: '',
            area: ''
        };
    },
    computed: {},
    watch: {},
    methods: {

        onSubmit(values) {
            this.username = values.用户名;
            this.password = values.密码;

            this.$http.post('http://127.0.0.1:8888/user/register', {
                imgurl: this.imgurl,
                username: this.username,
                password: this.password,
                area: this.area
            }).then(res => {
                if (res.data.code === 20000) {
                    Toast.success(res.data.msg);
                    this.$router.push('/my/login')
                } else if (res.data.code === 20001) {
                    Toast.fail(res.data.msg);
                }

            })
        },
        // 图片
        afterRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';
            setTimeout(() => {
                file.status = 'done ';
                file.message = '上传成功';
            }, 1000);
            // this.imgurl = 'http://127.0.0.1:8888/' + file.file.name;

            let img = new FormData();
            img.append("avatar", file.file);//上传图片传递file.file
            this.$http.post("http://localhost:8888/upload", img, {
                headers: {
                    enctype: "multipart/form-data",
                },
            }).then((res) => {
                this.imgurl = res.data.path
            });
        },
        // 点击选择城市，添加遮罩层
        upload(payload) {
            this.addclassname = payload;
        },
        // 子传父
        getCity(payload) {
            this.city = payload;
            this.area = this.city;
        },
    },
    created() { },
    mounted() { },
    beforeCreate() { },
    beforeMount() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
    components: {
        Three
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
