<template>
  <el-header>
    <el-main class="main">
      <el-page-header @back="$router.go(-1)" :title="from ? from.name : ''" content></el-page-header>
    </el-main>
  </el-header>
</template>

<script lang="ts">
import Vue from "vue";

import { Route } from "vue-router";

interface DataInterface {
  from: Route | null;
}

export default Vue.extend({
  data(): DataInterface {
    return {
      from: null
    };
  },
  mounted() {
    this.$router.beforeEach((to: Route, from: Route, next: Function) => {
      this.from = from;
      next();
    });
  }
});
</script>