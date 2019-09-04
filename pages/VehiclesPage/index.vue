<template>
  <div>
    <el-header>
      <el-row>
        <el-page-header @back="$router.back()" content="Vehicles overview"></el-page-header>
      </el-row>
    </el-header>
    <el-main>
      <data-table :get-data="getVehicles" :data="vehicles" ref="table" :columns="columns">
        <div slot="license_plate" class="license-plate" slot-scope="{row}">{{row.license_plate}}</div>
        <div slot="vin" class="monospace" slot-scope="{row}">{{row.vin}}</div>
      </data-table>
    </el-main>
  </div>
</template>

<script lang="ts" src="./index.ts" />