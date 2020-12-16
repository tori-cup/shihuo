<template>
  <div class="shopCart">
    <div class="cartList">
      <!-- 购物车有商品 显示 -->
      <ul v-if="goods.length > 0">
        <!-- 循环 -->
        <li v-for="item in goods" :key="item.id">
          <van-checkbox
            :value="item.id"
            v-model="item.isChecked"
            checked-color="#15C481"
            @click="chooseChange(item.id, item)"
          ></van-checkbox>
          <div class="shopdetail">
            <div class="detailimg">
              <img :src="item.thumb" />
            </div>
            <div class="detailtext">
              <div class="shoptitle van-multi-ellipsis--l2">
                {{ item.title }}
              </div>
              <div class="shoppricenum">
                <p class="shopprice">
                  ¥{{ item.price
                  }}{{ item.lvd > 0 ? '+' + item.lvd + 'LVD' : '' }}
                </p>
                <div class="shopnum">
                  <van-stepper v-model="item.num" @change="onChange(item)" />
                </div>
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
      </div>
    </div>
    <!-- 有商品 显示计算总价 -->
    <div class="cartfotter" v-if="goods.length > 0">
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
            ¥{{ totalprice }}{{ totallvd > 0 ? '+' + totallvd + 'LVD' : '' }}
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
      goods: [
        {
          id: 1,
          title: 'Zoneid 2019 新款羊羔绒蓝白拼接立领夹克男 9.9成新',
          price: 980,
          lvd: 12,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
        },
        {
          id: 2,
          title: '青春女装复古时尚保暖拼接翻领夹克',
          price: 1200,
          lvd: 0,
          num: 2,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
        },
        {
          id: 3,
          title: '成熟男装新款西装立体拼接立领夹克和正装',
          price: 1000,
          lvd: 8,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
        },
      ],
      allchecked: false,
      selectedData: [],
      // 总价
      totalprice: 0,
      totallvd: 0,
    };
  },
  created: function() {
    this.count();
  },
  computed: {},
  methods: {
    // 单选的change事件
    chooseChange(i, item) {
      Toast(i);
      if (this.selectedData.indexOf(i) > -1) {
        console.log(i);
        var arrs = this.selectedData.filter(function(item) {
          return item != i;
        });
        this.selectedData = arrs;
        item.isChecked = false;
        // this.remove(this.selectedData, i);
        this.count();
        console.log(this.selectedData);
      } else {
        this.selectedData.push(i);
        item.isChecked = true;
        this.count();
      }
      if (this.selectedData.length < this.goods.length) {
        this.allchecked = false;
      } else {
        this.allchecked = true;
      }
      this.count();
      console.log(this.selectedData);
    },
    // 商品数量
    onChange(item) {
      Toast(item.num);
      this.count();
      console.log(this.goods);
    },
    // 计算价格
    count: function() {
      var totalPrice = 0; //临时总价
      var totalLvd = 0; //临时lvd
      this.goods.forEach(function(val) {
        if (val.isChecked) {
          totalPrice += val.num * val.price; //累计总价
          totalLvd += val.num * val.lvd; //累计lvd
        }
      });
      this.totalprice = totalPrice;
      this.totallvd = totalLvd;
    },
    // 全选
    checkAll() {
      let list = this.goods;
      if (this.allchecked === true) {
        list.forEach((element) => {
          element.isChecked = false;
        });
        this.selectedData = [];
        this.count();
        console.log('111' + this.selectedData);
      } else {
        list.forEach((element) => {
          element.isChecked = true;
          if (this.selectedData.indexOf(element.id) < 0) {
            this.selectedData.push(element.id);
          }
        });
        this.count();
        console.log('222' + this.selectedData);
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
      console.log(cartgoods);
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
                    padding: 0px 12px;
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
          font-size: 10px;
          color: #001410;
        }
        .p2 {
          font-size: 12px;
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
