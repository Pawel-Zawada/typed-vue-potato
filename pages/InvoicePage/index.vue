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
        <el-button size="mini" @click="handleEdit(row)">Maintenance data</el-button>
        <el-button
          v-loading="!!deleting.find(id => id === row.id)"
          :disabled="!!deleting.find(id => id === row.id)"
          size="mini"
          type="danger"
          @click="handleDelete(row)"
        >Delete</el-button>
      </div>
    </data-table>
    <el-dialog
      v-if="dialog"
      :title="`Convert to maintenance data${ dialog.data && `: Invoice #${dialog.data.id}` }`"
      :visible.sync="dialog.open"
    >
      <el-form ref="invoiceForm" :model="form" label-width="120px">
        <el-form-item label="Odometer">
          <el-input-number v-model="form.odometer"></el-input-number>
        </el-form-item>

        <el-form-item label="Odometer unit">
          <el-select v-model="form.odometer_unit" placeholder="Select">
            <el-option
              v-for="item in odometerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Status">
          <el-select v-model="form.status" placeholder="Status">
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
              v-model="form.note"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Date">
            <el-date-picker v-model="form.date" type="date" placeholder="Date of invoice"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => { resetForm()}">Cancel</el-button>
        <el-button type="primary" @click="submitForm()">Confirm</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script src="./index.ts" lang="ts"></script>

<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
}
</style>