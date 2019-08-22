<template>
  <div>
    <el-table
      :data="invoices"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="Factuur"
        width="180">
      </el-table-column>
      <el-table-column
        prop="maintenance.vehicle.license_plate"
        label="Car"
        width="180">
      </el-table-column>
      <el-table-column
        prop="maintenance.vehicle.user.email"
        label="User"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from 'axios';

interface DataInterface {
  invoices: object;
}

export default Vue.extend({
  data(): DataInterface {
    return {
      invoices: {}
    }
  },
  async created(): Promise<void> {
    const {data: {data}} = await axios.get('/admin/api/invoices?include_relations=Maintenances,Maintenances.Vehicles,Maintenances.Vehicles.Users&sort=Invoices.id&direction=desc');
    this.invoices = data;
  }
});
</script>
<style lang="scss" scoped>
.main {
  padding-left: 0;
  padding-right: 0;
}
</style>
