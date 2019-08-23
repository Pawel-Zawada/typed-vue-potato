import Vue from 'vue';
import { getInvoices } from '../../api/invoices';

interface DataInterface {
  invoices: Invoice[];
  search: string;
}

export default Vue.extend({
  data(): DataInterface {
    return {
      invoices: [],
      search: ''
    };
  },
  methods: {
    searchFilter(): Invoice[] {
      return this.invoices.filter(
        data =>
          !this.search ||
          data.maintenance.vehicle.user.email
            .toLowerCase()
            .includes(this.search.toLowerCase())
      );
    },
    handleEdit(index: number, row: number) {
      console.log(index, row);
    },
    handleDelete(index: number, row: number) {
      console.log(index, row);
    }
  },
  async created(): Promise<void> {
    const data = await getInvoices();
    this.invoices = data;
  }
});
