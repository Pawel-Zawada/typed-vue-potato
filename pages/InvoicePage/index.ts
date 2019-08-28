import Vue from 'vue';

import {
  getInvoices,
  getInvoiceDocument,
  removeInvoice
} from '../../api/invoices';
import downloadBlob from '../../helpers/downloadBlob';

import DataTable from '../../components/DataTable/index.vue';

interface DataInterface {
  invoices: Invoice[];
  search: string;
  editing: number[];
  deleting: number[];
  downloading: number[];
  columns: DataTableColumn[];
}

export default Vue.extend({
  components: {
    DataTable
  },
  data(): DataInterface {
    return {
      invoices: [],
      search: '',
      editing: [],
      deleting: [],
      downloading: [],
      columns: [
        {
          prop: 'id',
          getProp: (row: Invoice): number => row.id,
          label: 'ID',
          minWidth: '80'
        },
        {
          prop: 'email',
          getProp: (row: Invoice): string => row.maintenance.vehicle.user.email,
          label: 'Email',
          minWidth: '100'
        },
        {
          prop: 'status',
          getProp: (row: Invoice): string => row.status,
          label: 'Status',
          minWidth: '100'
        },
        {
          prop: 'created',
          getProp: (row: Invoice): string => row.created,
          label: 'Created at',
          minWidth: '100'
        },
        {
          fixed: 'right',
          label: 'Operations'
        }
      ]
    };
  },
  methods: {
    async getInvoices(page: number, sort: DataTableSortParameter[]) {
      const response = await getInvoices(page, sort);

      this.invoices = response.data;

      return response;
    },
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
      switch (status) {
        case 'processed':
          return 'success';
        case 'pending':
          return '';
        case 'hold':
          return 'warning';
      }
    },
    // TODO: Implement editing form.
    handleEdit(invoice: Invoice) {
      this.editing.push(invoice.id);
    },
    async handleDelete(invoice: Invoice) {
      this.deleting.push(invoice.id);

      const success = await removeInvoice(invoice.id);
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
  }
});
