<template>
    <div id="main">
        <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(image, index) in images" :key="image">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="3">
            <van-grid-item icon="cart-circle" text="超市">
                <van-icon name="shop" color="#aaa" size="30px" />
            </van-grid-item>
            <van-grid-item icon="cart-circle" text="热门">
                <van-icon name="fire" color="#1ac45d" size="30px" />
            </van-grid-item>
            <van-grid-item icon="cart-circle" text="礼物">
                <van-icon name="gift" color="#dac45d" size="30px" />
            </van-grid-item>
            <van-grid-item icon="cart-circle" text="数码">
                <van-icon name="service" color="#78acb0" size="30px" />
            </van-grid-item>
            <van-grid-item icon="cart-circle" text="好物">
                <van-icon name="good-job" color="#ddd" size="30px" />
            </van-grid-item>
            <van-grid-item icon="cart-circle" text="新品">
                <van-icon name="new-arrival" color="#f15365" size="30px" />
            </van-grid-item>
            </van-swipe-item>

        </van-grid>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                '//img10.360buyimg.com/babel/s1180x940_jfs/t1/139909/20/17733/140763/5fd0a877E79d39f8d/df0fbd261e24c5c5.jpg.webp',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
                '//img12.360buyimg.com/pop/s1180x940_jfs/t1/151140/33/8873/86453/5fc6020aE3db37807/4bf59ed01cefe954.jpg.webp',
                '//img30.360buyimg.com/pop/s1180x940_jfs/t1/148503/38/15694/94091/5fbe0950Ee2b630f1/ff6a4762180a4698.jpg.webp',
                '//img11.360buyimg.com/pop/s1180x940_jfs/t1/155786/29/88/86932/5fd4895aE6c0f7501/db8d0b89b45cb91a.jpg.webp'
            ],
        };
    },
    computed: {},
    watch: {},
    methods: {
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
    },
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

// i {
//     display: block;
//     width: 50px;
//     height: 50px;
// }
</style>
