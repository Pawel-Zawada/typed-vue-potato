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
  odometerOptions: { label: string; value: OdometerUnit }[];
  statusOptions: { label: string; value: StatusString }[];
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
      ],
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
      ]
    };
  },
  methods: {
    async getInvoices(page: number, sort: DataTable.SortParameter[]) {
      const response = await getInvoices(page, sort);

      this.invoices = response.data;

      return response;
    },
    searchFilter(): Entities.Invoice[] {
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
    handleEdit(invoice: Entities.Invoice) {
      this.editing.push(invoice.id);

      this.dialog = {
        open: true,
        data: invoice
      };
      this.form = { ...invoice.maintenance, vehicle: undefined };
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
    },
    async submitForm() {
      this.$refs.invoiceForm.validate(async valid => {
        if (valid && this.form.id) {
          try {
            const response = await updateMaintenance(this.form.id, {
              ...this.form,
              vehicle: undefined
            });

            if (response.status === 'success') {
              this.cleanup();
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.cleanup();
    },
    resetEditing() {
      const invoice = this.invoices.find(
        invoice => invoice.maintenance_id === this.form.id
      );
      if (invoice) {
        const editingIndex = this.editing.findIndex(
          invoiceId => invoiceId === invoice.id
        );
        this.editing.splice(editingIndex, 1);
      }
    },
    cleanup() {
      this.$refs.table.getTableData();
      this.resetEditing();
      this.form = {};
      this.dialog = {
        open: false,
        data: undefined
      };
    }
  }
});
