import Vue from 'vue';

import {
  getInvoices,
  getInvoiceDocument,
  removeInvoice
} from '../../api/invoices';
import downloadBlob from '../../helpers/downloadBlob';

import DataTable from '../../components/DataTable/index.vue';

interface DataInterface {
  invoices: Entities.Invoice[];
  pending: number;
  pendingFilter: API.Filter[] &
    [{ table: 'Invoices'; column: 'status'; value: 'pending' }];
  hold: number;
  holdFilter: API.Filter[] &
    [{ table: 'Invoices'; column: 'status'; value: 'hold' }];
  processed: number;
  processedFilter: API.Filter[] &
    [{ table: 'Invoices'; column: 'status'; value: 'processed' }];
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
      pending: 0,
      pendingFilter: [
        { table: 'Invoices', column: 'status', value: 'pending' }
      ],
      hold: 0,
      holdFilter: [{ table: 'Invoices', column: 'status', value: 'hold' }],
      processed: 0,
      processedFilter: [
        { table: 'Invoices', column: 'status', value: 'processed' }
      ],
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
    async getInvoices(
      page: number,
      sort?: DataTable.SortParameter[],
      filters?: API.Filter[]
    ) {
      const response = await getInvoices(page, sort, filters);

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
  },
  created() {
    getInvoices(1, undefined, this.pendingFilter).then(
      response => (this.pending = response.pagination.count)
    );

    getInvoices(1, undefined, this.holdFilter).then(
      response => (this.hold = response.pagination.count)
    );

    getInvoices(1, undefined, this.processedFilter).then(
      response => response.pagination.count
    );
  }
});
