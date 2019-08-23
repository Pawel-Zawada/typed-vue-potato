<template>
  <el-header class="header">
    <el-main>
      <el-page-header @back="$router.go(-1)" title :content="$router.currentRoute.name"></el-page-header>
    </el-main>
  </el-header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    console.log(this.$router);
  }
});
</script>

<style lang="scss" scoped>
.header {
  padding-left: 0;
  padding-right: 0;
}
</style>