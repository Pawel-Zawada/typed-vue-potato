<template>
  <div>
    <el-header>
      <el-row>
        <el-page-header class="page-header" @back="$router.back()" content="Invoices overview"></el-page-header>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="buttons">
        <el-button @click="$refs.table.getTableData()">Refresh</el-button>

        <el-button
          class="filter-button"
          :plain="!($refs.table && $refs.table.filters.length === 0)"
          type="info"
          @click="$refs.table.filters = []; $refs.table.getTableData();"
        >All</el-button>

        <el-badge :value="pending" class="filter-button">
          <el-button
            :plain="!($refs.table && $refs.table.filters === pendingFilter)"
            type="primary"
            @click="$refs.table.filters = pendingFilter; $refs.table.getTableData();"
          >Pending</el-button>
        </el-badge>
        <el-badge :value="hold" class="filter-button">
          <el-button
            :plain="!($refs.table && $refs.table.filters === holdFilter)"
            type="warning"
            @click="$refs.table.filters = holdFilter; $refs.table.getTableData();"
          >Hold</el-button>
        </el-badge>
        <el-badge :value="processed" class="filter-button">
          <el-button
            :plain="!($refs.table && $refs.table.filters === processedFilter)"
            type="success"
            @click="$refs.table.filters = processedFilter; $refs.table.getTableData();"
          >Processed</el-button>
        </el-badge>
      </el-row>
      <data-table :get-data="getInvoices" :data="invoices" ref="table" :columns="columns">
        <div slot="status" slot-scope="{row}">
          <el-tag :type="getTagType(row.status)" close-transition>{{row.status}}</el-tag>
        </div>
        <div slot="Operations" slot-scope="{row}">
          <el-button
            v-loading="!!downloading.find(id => id === row.id)"
            :disabled="!!downloading.find(id => id === row.id)"
            size="mini"
            @click="handleDownload(row)"
          >Download</el-button>
          <router-link :to="`/invoices/${row.id}`">
            <el-button size="mini">Maintenance data</el-button>
          </router-link>
          <el-button
            v-loading="!!deleting.find(id => id === row.id)"
            :disabled="!!deleting.find(id => id === row.id)"
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >Delete</el-button>
        </div>
      </data-table>
    </el-main>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>

<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
}

.page-header {
  margin-bottom: 16px;
}
.filter-button {
  margin-right: 8px;
}
.buttons {
  margin-bottom: 16px;
}
</style>