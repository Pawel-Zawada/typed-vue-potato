import Vue from 'vue';

import { getInvoice, updateInvoice } from '../../api/invoices';
import { getCategories } from '../../api/categories';
import MaintenanceLine from './MaintenanceLine.vue';
import {
  addMaintenanceLines,
  getMaintenanceLinesByMaintenance,
  removeMaintenanceLines,
  updateMaintenanceLines
} from '../../api/maintenanceLines';
import { updateMaintenance } from '../../api/maintenances';

interface DataInterface {
  invoice?: Entities.Invoice;
  categories: Entities.Categories[];
  maintenanceLines: Partial<Entities.MaintenanceLine>[];
  maintenanceToRemove: number[];
  odometerOptions: { label: string; value: OdometerUnit }[];
  statusOptions: { label: string; value: StatusString }[];
}

export default Vue.extend({
  name: 'index',
  components: { MaintenanceLine },
  watch: {
    'invoice.status'(value) {
      if (this.invoice) this.invoice.maintenance.status = value;
    }
  },
  data(): DataInterface {
    return {
      invoice: undefined,
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
      ]
    };
  },
  methods: {
    async submitForm() {
      if (this.invoice) {
        await updateInvoice(this.invoice.id, this.invoice);
        await updateMaintenance(
          this.invoice.maintenance.id,
          this.invoice.maintenance
        );
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
      }

      for (const maintenanceId of this.maintenanceToRemove) {
        await removeMaintenanceLines(maintenanceId);
      }

      this.$router.push('/invoices');
    },
    addMaintenanceLine() {
      if (this.invoice) {
        this.maintenanceLines.push({
          id: Math.random()
            .toString(36)
            .substring(2, 15),
          maintenance_id: this.invoice.maintenance.id
        });
      }
    },
    removeMaintenanceLine(maintenanceLine: Entities.MaintenanceLine) {
      if (typeof maintenanceLine.id === 'number') {
        this.maintenanceToRemove.push(maintenanceLine.id);
      }

      const maintenanceIndex = this.maintenanceLines.findIndex(
        _maintenanceLine => _maintenanceLine.id === maintenanceLine.id
      );

      this.maintenanceLines.splice(maintenanceIndex, 1);
    },
    formatDate(date: DateString) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
  },
  async created() {
    const { data } = await getInvoice(this.$route.params.id);
    this.invoice = data;

    const categories = await getCategories();
    this.categories = categories.data;

    const { data: maintenanceLines } = await getMaintenanceLinesByMaintenance(
      this.invoice.maintenance.id
    );

    if (maintenanceLines) {
      this.maintenanceLines = maintenanceLines;
    }
  }
});
