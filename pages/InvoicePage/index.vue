<template>
  <el-table :data="searchFilter()" style="width: 100%">
    <el-table-column prop="id" label="Factuur" width="180"></el-table-column>
    <el-table-column prop="maintenance.vehicle.license_plate" label="Car" width="180"></el-table-column>
    <el-table-column prop="maintenance.vehicle.user.email" label="User" width="180"></el-table-column>
    <el-table-column prop="status" label="Status"></el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script src="./index.vue.ts" lang="ts"></script>
