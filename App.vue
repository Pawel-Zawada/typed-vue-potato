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

.monospace {
  font-family: monospace;
}

.license-plate {
  font-family: monospace;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 8px;
  display: inline-block;
  letter-spacing: 5px;
  background-color: #ecb604;
  padding: 5px;
  border-radius: 8px;
  border: 2px solid black;
  color: black;
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