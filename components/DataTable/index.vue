<template>
  <div>
    <el-table v-loading="loading" :data="data" v-bind="$attrs" v-on="listeners" style="width: 100%">
      <slot name="columns">
        <el-table-column
          :sortable="column.sortable ? 'custom' : false"
          v-for="column in columns"
          :key="column.prop"
          v-bind="column"
        >
          <template slot-scope="{row}">
            <slot
              :name="column.prop || column.type || column.label"
              :row="row"
            >{{ column.getProp && column.getProp(row) }}</slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <slot name="pagination" :page="page" :total="total">
      <el-pagination
        v-model="page"
        :total="total"
        :page-count="pageCount"
        :page-size="pageSize"
        @current-change="getTableData"
        layout="prev, pager, next"
      ></el-pagination>
    </slot>
  </div>
</template>

<script src="./index.ts" lang="ts" />
