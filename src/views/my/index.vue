<template>
    <div id="my">
        <div id="content">
            <!-- <p>{{flag}}</p> -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
#my #content {
    display: flex;
    flex: 1
}
</style>
