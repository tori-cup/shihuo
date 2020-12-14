<template>
    <div id="movie" :class="addclassname">
        <!-- 头部 -->
        <van-nav-bar title="电影" right-text="" left-arrow>
            <template #left>

            </template>
        </van-nav-bar>

        <van-tabs v-model="activeName">
            <van-tab title="主页" name="a" to="/movie/main"></van-tab>
            <van-tab title="圈子" name="b" to="/movie/round"></van-tab>
            <van-tab title="他说" name="c" to="/movie/say"></van-tab>
            <van-tab title="朋友" name="d" to="/movie/people"></van-tab>
        </van-tabs>
        <router-view/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addclassname: '',
            activeName: 'a',
        };
    },
    computed: {},
    watch: {},
    methods: {
    },
    created() {
        // this.$router.push('/movie/main')
    },

    mounted() {
        // 进入首页显示main内容，否则只能点击后显示
        this.$router.push('/movie/main')
    },
    beforeCreate() { },
    beforeMount() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
    components: {
    },
};
</script>

<style lang="scss" scoped>

</style>
