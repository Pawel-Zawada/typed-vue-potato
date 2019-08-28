/**
 * A string that represents a date/time format.
 */
declare type DateString = string;

declare type StatusString = 'pending' | 'processed' | 'hold';

/**
 * @property {function} getProp Passes the row data so you can retrieve any containing value that you need, and return it for the template to render.
 */
declare type DataTableColumn = {
  prop?: string;
  getProp?: (row: any) => string | number;
  label?: string;
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  fixed?: string;
};

/**
 * @param property Entity property which is to be sorted. Example: `Invoices.id`.
 * @param direction Order of sorting. Example: `ASC`.
 */
declare type DataTableSortParameter = {
  property: string;
  direction: string;
};

/**
 * @param DataType Typeset of the retrieved data from the API. Example: `Invoice[]`.
 * @param Paginated Boolean value whether the response will hold the `pagination` object.
 */
declare type DefaultResponse<DataType = any, Paginated = false> = {
  data: DataType;
  status: string;
  links: string[];
  pagination: Paginated extends true
    ? {
        /** Total amount of items available. */
        count: number;
        /** Maximum amount of items retrieved per request. */
        limit: number;
        /** Which page out of all pages the request is on. */
        page: number;
        /** Total amount of available pages, based on the `limit` property. */
        pages: number;
      }
    : undefined;
};

/**
 * @description Abstract function type of data getter functions that serve data types like `Invoice`.
 * @see DefaultResponse for parameter descriptions.
 */
declare type GetDataFunction<DataType = any, Paginated = false> = (
  page: number,
  sort?: DataTableSortParameter[]
) => Promise<DefaultResponse<DataType, Paginated>>;

declare type RemoveDataFunction = (id: number) => Promise<boolean>;

declare type Invoice = {
  created: DateString;
  extension: string;
  file_name: string;
  id: number;
  maintenance: Maintenance;
  maintenance_id: string;
  modified: DateString;
  status: StatusString;
};

declare type Maintenance = {
  created: string;
  garage_id: number;
  id: number;
  modified: string;
  status: StatusString;
  vehicle: Vehicle;
  vehicle_id: number;
};

declare type Vehicle = {
  brand: string;
  color: string;
  construction_year: string;
  created: string;
  fuel_declare: string;
  id: number;
  license_plate: string;
  model: string;
  modified: string;
  power: string;
  declare: string;
  user: User;
  user_id: number;
  vin: string;
};

declare type User = {
  created: string;
  email: string;
  first_name: string;
  id: number;
  is_admin: boolean;
  last_name: string;
  modified: string;
  status: 'active' | 'inactive';
};
