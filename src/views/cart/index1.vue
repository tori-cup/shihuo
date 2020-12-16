<template>
    <div id="find">
        <van-nav-bar title="购物车" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight">

            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>

        <!-- 列表 -->
        <!--  v-for="(item,index) in shop" :key="item['id']" -->
        <div class="cartList">
            <van-swipe-cell v-for="(item,index) in shop" :key="item['id']">
                <van-checkbox-group class="checkbox">
                    <van-checkbox name="a" @click.stop="checkBox($event,index)"></van-checkbox>
                </van-checkbox-group>
                <van-card :price="item.shop['price']" :desc="item.shop['intro']" :title="item.shop['title']" class="goods-card" thumb="https://img.yzcdn.cn/vant/cat.jpeg">
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button" />
                    </template>
                    <template #footer>
                        <van-stepper v-model="value[index]" theme="round" button-size="22" disable-input min="1" max="99" integer class="addAndPlus" @plus="plus" />
                        <span>总价{{value*item.shop['price']}}</span>
                    </template>
                </van-card>
            </van-swipe-cell>
        </div>
        <!-- 选择所有 -->
        <van-checkbox v-model="checked" class="checkAll" @click="checkAll">全选</van-checkbox>
        <!-- 总价 -->
        <div id="totalPrice">
            <div class="left">
                <p>共{{1}}件 金额：</p>
                <p class="totalPrice">{{22}}</p>
            </div>
            <div class="center">继续购物</div>
            <div class="right">去结算</div>
        </div>
        <router-view/>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            checked: false,
            result: [],
            shop: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 返回上一步
        onClickLeft() {
            this.$router.back(-1)
            Toast('返回');
        },
        onClickRight() {
            // Toast('按钮');
        },
        plus() {
            console.log(this.value)
        },
        // checkboxGroup(index) {
        //     // if(checked)
        //     var checkBox = this.$refs.checkboxGroup[index];
        //     console.log(checkBox)
        //     // if (checkBox) { }
        // },
        checkBox(e, index) {
            // 获取所有复选框
            // var checkBox = this.$refs.checkboxGroup.children;
            // var flag = true;
            // for (let i in checkBox) {
            //     // 如果有一个复选框没选中，flag就为false，最终选中所有为false。否则选中所有为true
            //     if (checkBox[i].checked === false) {
            //         flag = false;
            //     }
            // }
            console.log(e.target);
            // e.target.toggle();checkbox
            e.target.checkbox.toggle()
            // if(e.target.toggleAll)
            // this.checked = flag;
        },
        checkAll() {
            this.$refs.checkboxGroup.toggleAll(true);
            if (this.checked === true) {
                this.$refs.checkboxGroup.toggleAll(true);
            } else if (this.checked === false) {
                this.$refs.checkboxGroup.toggleAll(false);
            }
        },

        toggleAll() {
            this.$refs.checkboxGroup.toggleAll();
        },
    },
    created() {
        this.shop = JSON.parse(localStorage.getItem('shop'));
        console.log(this.shop)
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
#find {
    .cartList {
        position: relative;
        margin-top: 20px;
        .van-card {
            padding: 0 10px 0 30px;
            height: 100%; // .van-card__header {
            //     height: 100%;
            //     img {
            //         height: 100%;
            //     }
            // }
            .van-card__footer {
                display: flex;
                position: absolute;
                right: 16px;
                bottom: 0;
                span {
                    display: block;
                    width: 80px;
                    height: 100%;
                    line-height: 22px;
                    font-size: 16px;
                    text-align: center;
                }
            }
            .addAndPlus {
                // position: absolute;
                // right: 0;
                // bottom: 0;
            }
            .delete-button {
                height: 100%;
            }
        }
    }
    .checkAll {
        position: absolute;
        bottom: 110px;
    }
    .van-swipe-cell__wrapper {
        .checkbox {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            bottom: 50%;
            margin-top: -10px;
            left: 5px;
            z-index: 10;
        }
    }
    #totalPrice {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 50px;
        display: flex;
        justify-content: space-between;
        div {
            width: 33.0%;
            text-align: center;
        }
        .left {
            width: 33%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #fff;
            font-size: 14px;
            line-height: 20px;
        }
        .center {
            line-height: 50px;
            background: #F4F4F4;
        }
        .right {
            background: #FF6700;
            line-height: 50px;
            color: #fff;
        }
    }
}
</style>
