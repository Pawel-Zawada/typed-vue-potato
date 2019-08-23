<template>
  <el-main>
    <el-row type="flex" justify="center">
      <el-col class="title">
        <h1>Dashboard</h1>
      </el-col>
    </el-row>
    <el-row :gutter="16" type="flex" justify="center">
      <el-col class="card-col">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="header" slot="header">
            <h4>Factuurverwerker</h4>
          </div>
          <i class="el-icon-document"></i>
          <div class="bottom">
            <el-button @click="$router.push('/invoices')">Openen</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<style lang="scss" scoped>
.title {
  width: fit-content;
  h1 {
    display: inline-block;
  }
}

.card-col {
  width: fit-content;
}

.el-card {
  & {
    text-align: center;
  }
  h4 {
    display: inline-block;
    margin: 0;
  }

  i[class^="el-icon-"] {
    font-size: 100px;
    margin: 8px;
  }

  .bottom {
    border-top: 1px solid #ebeef5;
    padding: 8px;
  }
}
</style>