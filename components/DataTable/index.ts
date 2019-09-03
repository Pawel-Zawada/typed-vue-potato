import Vue, { PropType } from 'vue';

interface DataInterface {
  page: number;
  /** Total item count */
  total: number;
  /** Total page count. Set either total or page-count and pages will be displayed; if you need page-sizes, total is required */
  pageCount: number;
  /** Item count of each page */
  pageSize: number;
  sortParams: DataTable.SortParameter[];
  filters: API.Filter[];
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
    data: {
      type: Array,
      default: []
    },
    getData: {
      type: Function as PropType<API.GetDataFunction<any, true>>
    }
  },
  data(): DataInterface {
    return {
      page: 1,
      total: 1,
      pageCount: 1,
      pageSize: 1,
      sortParams: [],
      filters: [],
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
    async getTableData(page?: number, filters?: API.Filter[]): Promise<void> {
      this.loading = true;
      try {
        const response = await this.getData(
          page || this.page,
          this.sortParams,
          filters || this.filters
        );

        this.total = response.pagination.count;
        this.page = response.pagination.page;
        this.pageCount = response.pagination.pages;
        this.pageSize = response.pagination.limit;
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
