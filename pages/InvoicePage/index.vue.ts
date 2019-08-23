import Vue from 'vue';
import { getInvoices } from '../../api/invoices';

interface DataInterface {
  invoices: Invoice[];
  search: string;
  loading: boolean;
  submitting: number[];
  deleting: number[];
}

export default Vue.extend({
  data(): DataInterface {
    return {
      invoices: [],
      search: '',
      loading: true,
      submitting: [],
      deleting: []
    };
  },
  methods: {
    searchFilter(): Invoice[] {
      return this.invoices.filter(
        invoice =>
          !this.search ||
          invoice.maintenance.vehicle.user.email
            .toLowerCase()
            .includes(this.search.toLowerCase())
      );
    },
    handleEdit(index: number, row: Invoice) {
      this.submitting.push(row.id);
    },
    handleDelete(index: number, row: Invoice) {
      this.deleting.push(row.id);
    }
  },
  async created(): Promise<void> {
    const data = await getInvoices();
    this.invoices = data;
    this.loading = false;
  }
});
