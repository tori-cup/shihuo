<template>
    <div id="shopDetail">
        <div v-for="(item,index) in shopitem" :key="index">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
            <div id="txt">
                <div class="txt price">{{item.price}}</div>
                <div class="txt title">{{item.title}}</div>
                <div class="txt intro">{{item.intro}}</div>
            </div>

        </div>
        <van-goods-action class="goodsAction">
            <van-goods-action-icon icon="chat-o" text="客服" dot @click="noplay" />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="" @click="onClickIcon" />
            <van-goods-action-icon icon="shop-o" text="店铺" badge="" @click="onClickIcon" />
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickCart" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        </van-goods-action>

        <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="goodsId" :quota="quota" :quota-used="quotaUsed" :hide-stock="sku.hide_stock" :message-config="messageConfig" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            show: false,
            sku: {
                // 数据结构见下方文档
            },
            goods: {
                // 数据结构见下方文档
            },
            messageConfig: {
                // 数据结构见下方文档
            },
            shopitem: {},
            images: [
            ],
            // 加入购物车
            goodsId: "",
            quota: 0,
            quotaUsed: 0,
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickIcon() {
            Toast('点击图标');
        },
        onClickButton() {
            Toast('点击按钮');
        },
        noplay() {
            Toast('模块正在开发中');
        },
        // 加入购物车
        onClickCart() {
            this.show = true;
            this.goodsId = this.shopitem['detail']['item_id'];
            if (localStorage.getItem('shop')) {
                var shop = JSON.parse(localStorage.getItem('shop'))
                var addFlag = true;
                for (let index in shop) {
                    if (shop[index].id === this.goodsId) {
                        addFlag = false;
                    }
                }
                if (addFlag) {
                    var obj = {};
                    obj['id'] = this.goodsId;
                    obj['num'] = 1;
                    obj['shop'] = this.shopitem['detail'];
                    shop.push(obj);
                } else if (!addFlag) {
                    for (let index in shop) {
                        if (shop[index].id === this.goodsId) {
                            shop[index].num++;
                        }
                    }
                }
                localStorage.setItem('shop', JSON.stringify(shop));

            } else {
                var obj = {};
                obj['id'] = this.goodsId;
                obj['num'] = 1;
                obj['shop'] = this.shopitem['detail'];
                var shopArr = [obj]
                localStorage.setItem('shop', JSON.stringify(shopArr));
            }
            Toast.success("加入成功");
            // this.sku = this.shopitem;

            // this.goods = this.shopitem;this.shopitem
            // this.messageConfig = this.shopitem;this.shopitem
        },
        onBuyClicked() { },
        onAddCartClicked() { },

    },
    created() {
        this.shopitem = {};
        this.images = [];
        var item = this.$route.query.shopitem;
        this.shopitem['detail'] = item['data'];
        this.images.push(this.shopitem['detail']['img'])
        this.images.push(this.shopitem['detail']['img'])
    },

    mounted() {
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
#shopDetail {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-bottom: 50px;
    img {
        width: 100%;
        height: 300px;
    }
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .goodsAction {
        margin-bottom: 50px;
    }
    #txt {
        padding: 0 20px;
        .txt {
            width: 100%;
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 100;
        }
        .price {
            color: #f00;
            width: 100%;
            font-size: 20px;
            font-weight: 500;
        }
        .txt2 {}
        .txt3 {}
    }
}
</style>
