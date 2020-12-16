<template>
  <div id="find">
    1
    <li v-for="item in goods" :key="item.id">
      <van-checkbox
        :value="item.id"
        v-model="item.isChecked"
        checked-color="#15C481"
        @click="chooseChange(item.id, item)"
      ></van-checkbox>
    </li>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: {
        id: 1,
      },
    };
  },
  computed: {},
  watch: {},
  methods: { chooseChange() {} },
  created() {},

  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
