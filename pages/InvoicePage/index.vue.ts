import Vue from 'vue';
import {
  getInvoices,
  getInvoiceDocument,
  deleteInvoice
} from '../../api/invoices';
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
    getTagType(status: StatusString) {
      if (status === 'processed') return 'success';
      if (status === 'pending') return '';
      if (status === 'hold') return 'warning';
    },
    handleEdit(invoice: Invoice) {
      this.submitting.push(invoice.id);
    },
    async handleDelete(invoice: Invoice) {
      this.deleting.push(invoice.id);

      const success = await deleteInvoice(invoice.id);
      if (success) {
        const invoiceIndex = this.invoices.findIndex(
          _invoice => _invoice.id === invoice.id
        );
        this.invoices.splice(invoiceIndex, 1);
      }

      const index = this.deleting.findIndex(id => id === invoice.id);
      this.deleting.splice(index, 1);
    },
    async handleDownload(invoice: Invoice) {
      this.downloading.push(invoice.id) - 1;

      const file = await getInvoiceDocument(invoice.id);
      downloadBlob(file, invoice.file_name);

      const index = this.downloading.findIndex(id => id === invoice.id);
      this.downloading.splice(index, 1);
    }
  },
  async created(): Promise<void> {
    this.invoices = await getInvoices();
    this.loading = false;
  }
});
