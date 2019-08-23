<template>
  <el-table v-loading="loading" :data="searchFilter()" class="table">
    <el-table-column prop="id" label="Factuur" width="180"></el-table-column>
    <el-table-column prop="maintenance.vehicle.license_plate" label="Car" width="180"></el-table-column>
    <el-table-column prop="maintenance.vehicle.user.email" label="User" width="180"></el-table-column>
    <el-table-column prop="status" label="Status"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-input v-model="search" size="mini" placeholder="Search by email..." />
      </template>
      <template slot-scope="scope">
        <el-button
          v-loading="!!submitting.find(id => id === scope.row.id)"
          :disabled="!!submitting.find(id => id === scope.row.id)"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button>
        <el-button
          v-loading="!!deleting.find(id => id === scope.row.id)"
          :disabled="!!deleting.find(id => id === scope.row.id)"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script src="./index.vue.ts" lang="ts"></script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.table {
  width: 100%;
  height: 100%;
}
</style>