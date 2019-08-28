<template>
  <el-main>
    <el-button @click="$refs.table.getTableData()">Refresh</el-button>
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
        <el-button
          v-loading="!!editing.find(id => id === row.id)"
          :disabled="!!editing.find(id => id === row.id)"
          size="mini"
          @click="handleEdit(row)"
        >Edit</el-button>
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
</template>

<script src="./index.ts" lang="ts"></script>

<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
}
</style>