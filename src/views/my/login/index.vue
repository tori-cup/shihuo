<template>
    <div id="login">
        <!-- v-if="!hasLogin" -->
        <div id="content">
            <van-form @submit="onSubmit">
                <!-- 文本 -->
                <div v-if="loginway">
                    <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                            登录
                        </van-button>
                    </div>
                    <div style="display:flex;justify-content: space-between;margin:0 20px;">
                        <div @click="changeway">手机验证登录</div>
                        <router-link tag="div" to="/my/register" class="search_entry">
                            立即注册
                        </router-link>
                    </div>
                </div>

                <div v-else>
                    <!-- 文本 -->
                    <van-field v-model="username1" name="手机号" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
                    <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码" :rules="[{ required: true, message: '请填写验证码' }]">
                        1
                        <template #button>
                            <van-button size="small" type="primary">发送验证码</van-button>
                        </template>
                    </van-field>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                            登录
                        </van-button>
                    </div>
                </div>
            </van-form>

        </div>
    </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
// Token
import { getToken, setToken, removeToken } from "../../../util/cookie";

import { Toast } from 'vant';

export default {
    data() {
        return {
            username: '',
            username1: '',
            password: '',
            hasLogin: getToken() || "",
            loginway: true,
            text: '',
            sms: '',
            lg: '已登录'
        };
    },
    computed: {},
    watch: {},
    methods: {
        onSubmit(values) {
            this.username = values.用户名 || this.username1;
            this.password = values.密码;
            document.cookie = `username=${this.username}`;
            // 点击登录 切换登录状态为'已登录'
            this.$store.commit('login');
            this.$http.post('http://127.0.0.1:8888/user/login', {
                username: this.username,
                password: this.password,
            }).then(res => {
                if (res.data.code === 20000) {
                    Toast.success(res.data.msg);
                    this.$router.push('/my');
                    setToken(res.data.token);
                    this.hasLogin = getToken() || "";
                } else if (res.data.code === 20001) {
                    console.log(1)
                    Toast.fail(res.data.msg);
                }

            })
        },
        // 改变登录方式
        changeway() {
            this.loginway = false;
        }
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
        Header,
        Footer,
    },
};
</script>

<style lang="scss" scoped>
// 输入框
.van-cell {
    height: 68px;
}
</style>
