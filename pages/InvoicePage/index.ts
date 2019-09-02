import Vue from 'vue';

import {
  getInvoices,
  getInvoiceDocument,
  removeInvoice
} from '../../api/invoices';
import downloadBlob from '../../helpers/downloadBlob';

import DataTable from '../../components/DataTable/index.vue';
import { updateMaintenance } from '../../api/maintenances';

interface DataInterface {
  invoices: Entities.Invoice[];
  search: string;
  editing: number[];
  deleting: number[];
  downloading: number[];
  columns: DataTable.Column[];
  dialog: {
    open: boolean;
    data?: Entities.Invoice;
  };
  form: Partial<Entities.Maintenance<false>>;
  $refs?: {
    invoiceForm: Vue & Element.Form;
    table: any;
  };
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
          getProp: (row: Entities.Invoice): number => row.id,
          label: 'ID',
          minWidth: '20'
        },
        {
          prop: 'email',
          getProp: (row: Entities.Invoice): string =>
            row.maintenance.vehicle.user.email,
          label: 'Email'
        },
        {
          prop: 'status',
          getProp: (row: Entities.Invoice): string => row.status,
          label: 'Status'
        },
        {
          prop: 'created',
          getProp: (row: Entities.Invoice): string => row.created,
          label: 'Created at'
        },
        {
          fixed: 'right',
          label: 'Operations',
          minWidth: '100'
        }
      ],

      form: {},
      dialog: {
        open: false,
        data: undefined
      }
    };
  },
  methods: {
    async getInvoices(page: number, sort: DataTable.SortParameter[]) {
      const response = await getInvoices(page, sort);

      this.invoices = response.data;

      return response;
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
    async handleDelete(invoice: Entities.Invoice) {
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
    async handleDownload(invoice: Entities.Invoice) {
      this.downloading.push(invoice.id) - 1;

      const file = await getInvoiceDocument(invoice.id);
      downloadBlob(file, invoice.file_name);

      const index = this.downloading.findIndex(id => id === invoice.id);
      this.downloading.splice(index, 1);
    }
  }
});
