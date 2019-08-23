import Vue from 'vue';
import { getInvoices, getInvoiceDocument } from '../../api/invoices';
import downloadBlob from '../../helpers/downloadBlob';

interface DataInterface {
  invoices: Invoice[];
  search: string;
  loading: boolean;
  submitting: number[];
  deleting: number[];
  downloading: number[];
}

export default Vue.extend({
  data(): DataInterface {
    return {
      invoices: [],
      search: '',
      loading: true,
      submitting: [],
      deleting: [],
      downloading: []
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
    handleEdit(invoice: Invoice) {
      this.submitting.push(invoice.id);
    },
    handleDelete(invoice: Invoice) {
      this.deleting.push(invoice.id);
    },
    async handleDownload(invoice: Invoice) {
      const index = this.downloading.push(invoice.id) - 1;

      const file = await getInvoiceDocument(invoice.id);
      downloadBlob(file, invoice.file_name);

      console.log(index);

      console.log(`splicing on ${index}`);
      console.log(this.downloading.splice(index, 1), this.downloading);
    }
  },
  async created(): Promise<void> {
    this.invoices = await getInvoices();
    this.loading = false;
  }
});
