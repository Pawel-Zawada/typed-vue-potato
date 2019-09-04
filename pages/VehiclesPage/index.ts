import Vue from 'vue';

import DataTable from '../../components/DataTable/index.vue';
import { getVehicles } from '../../api/vehicles';

interface DataInterface {
  vehicles: Entities.Vehicle[];
  columns: DataTable.Column<Entities.Vehicle>[];
}

export default Vue.extend({
  components: {
    DataTable
  },
  data(): DataInterface {
    return {
      vehicles: [],
      columns: [
        {
          prop: 'id',
          getProp: row => row.id,
          label: 'ID',
          minWidth: '20'
        },
        {
          prop: 'license_plate',
          getProp: row => row.license_plate,
          label: 'License plate'
        },
        {
          prop: 'vin',
          getProp: row => row.vin,
          label: 'VIN'
        },
        {
          prop: 'brand',
          getProp: row => row.brand,
          label: 'Brand'
        },
        {
          prop: 'model',
          getProp: row => row.model,
          label: 'Model'
        },
        {
          prop: 'power',
          getProp: row => row.power,
          label: 'Power'
        },
        {
          prop: 'fuel_type',
          getProp: row => row.fuel_type,
          label: 'Fuel type'
        },
        {
          prop: 'color',
          getProp: row => row.color,
          label: 'Color'
        }
      ]
    };
  },
  methods: {
    async getVehicles(
      page: number,
      sort?: DataTable.SortParameter[],
      filters?: API.Filter[]
    ) {
      const response = await getVehicles(page, sort, filters);

      this.vehicles = response.data;

      return response;
    }
  }
});
