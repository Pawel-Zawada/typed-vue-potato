<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script lang="ts">
import Vue from "vue";
import PageHeader from "./components/PageHeader.vue";
export default Vue.extend({
  components: {
    pageheader: PageHeader
  }
});
</script>

<style lang="scss">
body {
  background-color: #fafafa;
}
</style>
