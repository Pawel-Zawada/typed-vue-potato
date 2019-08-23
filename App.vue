<template class="container">
  <router-view :key="$route.fullPath"></router-view>
</template>

<style lang="scss">
body {
  background-color: #fafafa;
}
.container {
  height: 100%;
}
</style>

<style lang="scss">
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