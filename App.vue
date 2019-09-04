<template class="container">
  <router-view :key="$route.fullPath"></router-view>
</template>

<style lang="scss">
body {
  background-color: rgb(242, 246, 252);
}
.container {
  height: 100%;
}
</style>

<style lang="scss">
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
/* Allows the `v-loading` directive to be passed to buttons by fixing the spinner size and position. */
.el-button {
  .el-loading-mask .el-loading-spinner {
    & {
      margin-top: -10px;
    }
    .circular {
      height: 20px;
      width: 20px;
    }
  }
}
</style>