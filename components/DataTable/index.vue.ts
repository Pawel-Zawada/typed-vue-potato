import Vue, { PropType } from 'vue';

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
      type: Function as PropType<GetDataFunction<any, true>>
    }
  },
  data(): DataInterface {
    return {
      tableData: [],
      page: 1,
      total: 1,
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
    async getTableData(page: number) {
      this.loading = true;
      try {
        const response = await this.getData(page || this.page, this.sortParams);
        this.tableData = response.data;

        this.total = response.pagination.limit;
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
      this.getTableData(this.page);
    }
  },
  created() {
    this.getTableData(this.page);
  }
});
