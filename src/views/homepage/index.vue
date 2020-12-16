<template>
    <div id="homepage" :class="addclassname">
        <router-view/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addclassname: '',
        };
    },
    computed: {},
    watch: {},
    methods: {
    },
    created() {

    },

    mounted() {
        // 进入首页显示main内容，否则只能点击后显示
        this.$router.push('/homepage/main');
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
