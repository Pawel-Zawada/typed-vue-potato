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
  dialog: {
    open: boolean;
    data?: Invoice;
  };
  form: Partial<Maintenance>;
  odometerOptions: { label: string; value: OdometerUnit }[];
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
          minWidth: '20'
        },
        {
          prop: 'email',
          getProp: (row: Invoice): string => row.maintenance.vehicle.user.email,
          label: 'Email'
        },
        {
          prop: 'status',
          getProp: (row: Invoice): string => row.status,
          label: 'Status'
        },
        {
          prop: 'created',
          getProp: (row: Invoice): string => row.created,
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
      },
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

      this.dialog = {
        open: true,
        data: invoice
      };
      this.form = invoice.maintenance;

      console.log(this.dialog, this.form);
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
    },
    // https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
    toTitleCase(str: any) {
      str = str.toLowerCase().split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
    }
  }
});
