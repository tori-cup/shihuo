<template>
  <div class="shopCart">
    <div class="cartList">
      <!-- 购物车有商品 显示 -->
      <ul v-if="goods">
        <!-- 循环 -->
        <li v-for="item in goods" :key="item.id">
          <!-- 单选框 item.isChecked判断是否选中 -->
          <van-checkbox
            :value="item.id"
            v-model="item.isChecked"
            checked-color="#15C481"
            @click="chooseChange(item.id, item)"
            ref="check"
          ></van-checkbox>
          <!-- 商品列表 -->
          <div class="shopdetail">
            <div class="detailimg">
              <img :src="item.shop.img" />
            </div>
            <div class="detailtext">
              <div class="shoptitle van-multi-ellipsis--l2">
                <p>{{ item.shop.title }}</p>
                <p>{{ item.shop.intro }}</p>
              </div>
              <div class="shoppricenum">
                <p class="shopprice">
                  ¥{{ item.shop.price
                  }}{{ item.lvd > 0 ? '+' + item.lvd + 'LVD' : '' }}
                </p>
                <div class="shopnum">
                  <van-stepper
                    v-model="item.num"
                    @plus="onChangePlus(item)"
                    @minus="onChangeMinus(item)"
                    min="1"
                    max="99"
                  />
                </div>
                <p ref="singleTotal">{{ item.num * item.shop.price }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 没有商品 显示为空 -->
      <div class="nohaveshop" v-else>
        <van-icon name="shopping-cart-o" />
        <p class="p1">你的购物车空空如也~~</p>
        <p class="p2">快去采购吧!</p>
        <button class="gotohome" @click="gotohome">去逛逛</button>
      </div>
    </div>
    <!-- 有商品 显示计算总价 -->
    <div class="cartfotter" v-if="goods">
      <van-submit-bar button-text="去结算" @submit="onSubmit">
        <van-checkbox
          v-model="allchecked"
          checked-color="#15C481"
          @click="checkAll"
          >全选</van-checkbox
        >
        <div class="buyprice">
          <p class="p1">合计</p>
          <p class="p2">
            <!-- {{ totallvd > 0 ? '+' + totallvd + 'LVD' : '' }} -->
            ¥{{ totalprice }}
          </p>
        </div>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Icon, Checkbox, Stepper, SubmitBar, Toast } from 'vant';
export default {
  components: {
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar,
    [Toast.name]: Toast,
  },
  data() {
    return {
      goods: [],
      allchecked: false,
      selectedData: [],
      // 总价
      totalprice: 0,
      // totallvd: 0,
    };
  },
  created: function() {
    window.onbeforeunload = function($event) {
      //判断是关闭还是刷新
      if (
        ($event.clientX > document.body.clientWidth && $event.clientY < 0) ||
        $event.altKey
      ) {
        //关闭时执行
      } else {
        //刷新时执行
        this.count();
      }
    };
    // 刚进入页面 所有商品不选中
    if (JSON.parse(localStorage.getItem('shop'))) {
      this.goods = JSON.parse(localStorage.getItem('shop'));
      this.goods.forEach((item, index) => {
        this.goods[index].isChecked = false;
      });
      localStorage.setItem('shop', JSON.stringify(this.goods));
      this.goods = JSON.parse(localStorage.getItem('shop'));
    } else {
      this.goods = false;
    }
  },
  computed: {},
  methods: {
    // 单选的change事件
    // chooseChange(item.id, item)
    chooseChange(id, item) {
      var shop = JSON.parse(localStorage.getItem('shop'));
      this.selectedData = [];

      // 循环所有单选框，如果选中就把id添加到selectedData
      this.$refs.check.forEach((item1) => {
        if (item1['checked'] === true) {
          this.selectedData.push(id);
        }
      });

      // 更新localStorage的选中状态 变更当前点击的商品状态
      if (item.isChecked) {
        shop.forEach((item1, index) => {
          if (item1.id === item.id) {
            shop[index].isChecked = true;
          }
        });
      } else {
        shop.forEach((item1, index) => {
          if (item1.id === item.id) {
            shop[index].isChecked = false;
          }
        });
      }
      localStorage.setItem('shop', JSON.stringify(shop));

      var num = this.selectedData.length;
      if (num === this.goods.length && item.isChecked === true) {
        this.allchecked = true;
      } else if (num === this.goods.length && item.isChecked === false) {
        this.allchecked = false;
        item.isChecked = false;
      } else {
        this.allchecked = false;
      }
      this.count();
    },
    // 商品数量
    // 增加
    onChangePlus(item) {
      var shop = JSON.parse(localStorage.getItem('shop'));
      shop.forEach((item1, index) => {
        if (item1.id === item.id) {
          shop[index].num++;
          Toast(shop[index].num);
        }
      });
      localStorage.setItem('shop', JSON.stringify(shop));
      // localStorage.this.count();
      this.count();
    },
    // 减少
    onChangeMinus(item) {
      var shop = JSON.parse(localStorage.getItem('shop'));
      shop.forEach((item1, index) => {
        if (item1.id === item.id) {
          shop[index].num--;
          Toast(shop[index].num);
        }
      });
      localStorage.setItem('shop', JSON.stringify(shop));
      // localStorage.this.count();
      this.count();
    },

    // 计算价格
    count: function() {
      var shop = JSON.parse(localStorage.getItem('shop'));
      var totalPrice1 = 0; //临时总价
      // var totalLvd = 0; //临时lvd
      shop.forEach(function(val) {
        if (val.isChecked) {
          totalPrice1 += val.num * val.shop.price; //累计总价
          // totalLvd += val.num * val.lvd; //累计lvd
        }
      });
      this.totalprice = totalPrice1;
      // this.totallvd = totalLvd;
    },
    // 全选
    checkAll() {
      var shop = JSON.parse(localStorage.getItem('shop'));
      if (this.allchecked === true) {
        // 如果全选 走这一步 将所有checked变为true
        this.$refs.check.forEach((item1) => {
          item1['checked'] = true;
        });
        shop.forEach((item, index) => {
          shop[index].isChecked = true;
        });
        localStorage.setItem('shop', JSON.stringify(shop));

        this.count();
      } else {
        // 如果取消全选 走这一步 将所有checked变为false
        this.$refs.check.forEach((item1) => {
          item1['checked'] = false;
        });
        shop.forEach((item, index) => {
          shop[index].isChecked = true;
        });
        localStorage.setItem('shop', JSON.stringify(shop));
        this.totalprice = 0;
      }
    },
    // 去结算
    onSubmit() {
      // 选择购买的商品
      var cartgoods = [];
      this.goods.forEach(function(item) {
        if (item.isChecked) {
          cartgoods.push({ id: item.id, num: item.num });
        }
      });
      if (cartgoods.length === 0) {
        Toast('请选择商品购买');
      } else {
        this.$router.push('shopBuy');
      }
    },
    // 回到首页
    gotohome() {
      this.$router.push('/homepage/main');
    },
  },
};
</script>

<style lang="scss" scoped>
.shopCart {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .cartList {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 100px;
      li {
        width: 100%;
        height: 96px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 12px;
        .van-checkbox {
          margin-left: 17px;
          ::v-deep .van-checkbox__icon {
            height: 14px;
            line-height: 14px;
            .van-icon {
              width: 14px;
              height: 14px;
              font-size: 12px;
              border: 1px solid #a5a5a5;
            }
          }
        }
        .shopdetail {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 13px;
          .detailimg {
            width: 64px;
            height: 64px;
            background: rgba(165, 165, 165, 1);
            border-radius: 4px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }
          .detailtext {
            width: 230px;
            height: 60px;
            display: flex;
            flex-direction: column;
            margin-left: 8px;
            position: relative;
            .shoptitle {
              width: 180px;
              text-align: justify;
              font-size: 12px;
              color: #212121;
              line-height: 17px;
            }
            .shoppricenum {
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              position: absolute;
              bottom: 0px;
              .shopprice {
                font-size: 12px;
                color: #15c481;
                font-weight: 600;
              }
              .shopnum {
                display: flex;
                ::v-deep .van-stepper {
                  button {
                    width: 20px;
                    height: 20px;
                    border: 1px solid #333333;
                    border-radius: 50px;
                    background-color: #fff;
                  }
                  .van-stepper__minus::before {
                    width: 8px;
                  }
                  .van-stepper__plus::before {
                    width: 8px;
                  }
                  .van-stepper__plus::after {
                    height: 8px;
                  }
                  .van-stepper__input {
                    font-size: 16px;
                    color: #333333;
                    background-color: #fff;
                    padding: 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .nohaveshop {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 100px;
      .van-icon {
        font-size: 60px;
        color: #666;
      }
      p {
        font-size: 14px;
        color: #999;
      }
      .p1 {
        margin-top: 20px;
      }
      .gotohome {
        margin-top: 10px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.15);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 2rem;
        line-height: 0.5rem;
        padding: 0 0.24rem;
        color: rgba(0, 0, 0, 0.87);
        font-style: normal;
      }
    }
  }
  .cartfotter {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 50px;
    left: 0;
    .van-submit-bar__bar {
      width: 100%;
      height: 60px;
      font-size: 16px;
      position: absolute;
      bottom: 50px;
      background: #fff;
      .van-checkbox {
        margin-left: 17px;
        ::v-deep .van-checkbox__icon {
          height: 14px;
          line-height: 14px;
          .van-icon {
            width: 14px;
            height: 14px;
            font-size: 12px;
            border: 1px solid #a5a5a5;
          }
        }
        ::v-deep .van-checkbox__label {
          font-size: 16px;
          color: #212121;
          margin-left: 9px;
        }
      }
      .buyprice {
        flex: 1;
        padding-right: 8px;
        text-align: right;
        display: flex;
        flex-direction: column;
        .p1 {
          font-size: 16px;
          color: #001410;
        }
        .p2 {
          font-size: 16px;
          color: #15c481;
          margin-top: 4px;
        }
      }
      .van-button--danger {
        width: 130px;
        height: 60px;
        background: rgba(21, 196, 129, 1);
        border: none;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
