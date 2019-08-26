import Vue from 'vue';

interface DataInterface {
  tableData: [];
  page: number;
  total: number;
  sortParams: { property: string; direction: string }[];
  loading: boolean;
}

export default Vue.extend({
  name: 'DataTable',
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    getData: {
      type: Function,
      default: () => Promise.resolve([])
    }
  },
  data(): DataInterface {
    return {
      tableData: [],
      page: 1,
      total: 10,
      sortParams: [],
      loading: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        ['sort-change']: (this as any).onSortChange
      };
    }
  },
  methods: {
    async getTableData(page?: number) {
      this.loading = true;
      const reqPage = page || this.page;
      try {
        const response = await this.getData({
          page: reqPage,
          sortParams: this.sortParams
        });
        this.tableData = response.data;
        this.total = response.total;
      } finally {
        this.loading = false;
      }
    },
    onSortChange({ property, order }: { property: string; order: string }) {
      if (property !== null) {
        const shortOrder = order === 'ascending' ? 'asc' : 'desc';
        this.sortParams = [{ property, direction: shortOrder }];
      } else {
        this.sortParams = [];
      }
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
});
