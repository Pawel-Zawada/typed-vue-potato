<template>
  <div>
    <el-form ref="invoiceForm" :model="invoice" label-width="120px" v-if="invoice">
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

      <el-col :span="12">
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

      <el-col :span="12">
        <MaintenanceLine
          v-for="maintenanceLine in maintenanceLines"
          :key="maintenanceLine.id"
          :maintenance-line="maintenanceLine"
          :categories="categories"
          @remove="removeMaintenanceLine"
        />
        <el-button @click="addMaintenanceLine">Add maintenance line</el-button>
      </el-col>

      <el-col :span="24">
        <router-link to="/invoices">
          <el-button>Cancel</el-button>
        </router-link>
        <el-button type="primary" @click="submitForm">Confirm</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script lang="ts" src="./index.ts" />
