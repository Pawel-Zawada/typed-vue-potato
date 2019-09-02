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
          <el-date-picker v-model="invoice.maintenance.date" type="date" placeholder="Date of invoice"></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <MaintenanceLine v-for="maintenanceLine in maintenanceLines"
                         :key="maintenanceLine.id"
                         :maintenance-line="maintenanceLine"
                         :categories="categories"
                         @remove="removeMaintenanceLine"/>
        <el-button @click="addMaintenanceLine">Add maintenance line</el-button>
      </el-col>

      <el-col :span="24">
        <el-button @click="() => { resetForm()}">Cancel</el-button>
        <el-button type="primary" @click="submitForm">Confirm</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import {getInvoice, updateInvoice} from "../../api/invoices";
import {getCategories} from "../../api/categories";
import MaintenanceLine from "./MaintenanceLine";
import {
  addMaintenanceLines,
  getMaintenanceLinesByMaintenance, removeMaintenanceLines,
  updateMaintenanceLines
} from "../../api/maintenanceLines";
import {updateMaintenance} from "../../api/maintenances";

export default {
  name: "index",
  components: {MaintenanceLine},
  watch: {
    'invoice.status'(value) {
      this.invoice.maintenance.status = value
    }
  },
  data() {
    return {
      invoice: {},
      categories: [],
      maintenanceLines: [],
      maintenanceToRemove: [],
      statusOptions: [
        {
          label: 'Pending',
          value: 'pending'
        },
        {
          label: 'Processed',
          value: 'processed'
        },
        {
          label: 'Hold',
          value: 'hold'
        }
      ],
      odometerOptions: [
        {
          label: 'Kilometers',
          value: 'km'
        },
        {
          label: 'Miles',
          value: 'mi'
        }
      ],
    }
  },
  methods: {
    async submitForm() {
      await updateInvoice(this.invoice.id, this.invoice);
      await updateMaintenance(this.invoice.maintenance.id, this.invoice.maintenance);
      for (const maintenanceLine of this.maintenanceLines) {
        if (typeof maintenanceLine.id === 'number') {
          await updateMaintenanceLines(maintenanceLine.id, maintenanceLine);
        } else {
          await addMaintenanceLines({
            categorie_id: maintenanceLine.categorie_id,
            maintenance_id: this.invoice.maintenance.id
          });
        }
      }

      for (const maintenanceId of this.maintenanceToRemove) {
        await removeMaintenanceLines(maintenanceId)
      }
    },
    addMaintenanceLine() {
      this.maintenanceLines.push({
        id: Math.random().toString(36).substring(2, 15),
        maintenance_id: this.invoice.maintenance.id
      });
    },
    removeMaintenanceLine(maintenanceLine) {
      if (typeof maintenanceLine.id === 'number') {
        this.maintenanceToRemove.push(maintenanceLine.id);
      }

      const maintenanceIndex = this.maintenanceLines.findIndex(
        _maintenanceLine => _maintenanceLine.id === maintenanceLine.id
      );

      this.maintenanceLines.splice(maintenanceIndex, 1);
    }
  },
  async created() {
    const {data} = await getInvoice(this.$route.params.id)
    this.invoice = data;

    const categories = await getCategories();
    this.categories = categories.data;

    const {data: maintenanceLines} = await getMaintenanceLinesByMaintenance(this.invoice.maintenance.id)

    if (maintenanceLines) {
      this.maintenanceLines = maintenanceLines;
    }
  }
}
</script>

<style scoped>

</style>
