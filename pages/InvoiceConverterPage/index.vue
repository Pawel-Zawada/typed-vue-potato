<template>
  <div>
    <el-main class="main">
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <el-page-header @back="$router.back()" content="Maintenance data"></el-page-header>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="submitForm">Save</el-button>
        </el-col>
      </el-row>

      <div v-if="invoice">
        <div class="monospace">{{invoice.maintenance.vehicle.license_plate}}</div>
        <b>{{invoice.maintenance.vehicle.user.email}}</b>
        on
        <b>{{formatDate(invoice.created)}}</b>
      </div>
    </el-main>
    <el-form class="form" ref="invoiceForm" :model="invoice" label-width="120px" v-if="invoice">
      <el-col :span="6">
        <el-form-item label="Odometer">
          <el-input-number v-model="invoice.maintenance.odometer"></el-input-number>
        </el-form-item>

        <el-form-item label="Odometer unit">
          <el-select v-model="invoice.maintenance.odometer_unit" placeholder="Select">
            <el-option
              v-for="item in odometerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Status">
          <el-select v-model="invoice.status" placeholder="Status">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-col :span="19">
          <el-form-item label="Note">
            <el-input
              type="textarea"
              autosize
              placeholder="Anything that needs to be noted?"
              v-model="invoice.maintenance.note"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Date">
            <el-date-picker
              v-model="invoice.maintenance.date"
              type="date"
              placeholder="Date of invoice"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-col>

      <el-col :span="4">
        <h5 class="maintenance-lines-header">Maintenance lines</h5>
        <MaintenanceLine
          v-for="maintenanceLine in maintenanceLines"
          :key="maintenanceLine.id"
          :maintenance-line="maintenanceLine"
          :categories="categories"
          @remove="removeMaintenanceLine"
        />
        <el-button @click="addMaintenanceLine">Add maintenance line</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss" scoped>
.main {
  padding-top: 0;
}
.monospace {
  font-family: monospace;
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
}
.form {
  margin-top: 32px;
}
.maintenance-lines-header {
  margin-top: 0;
}
</style>

