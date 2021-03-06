declare namespace Element {
  type Form = {
    validate: (validation: (validate: boolean) => void) => boolean;
    resetFields: Function;
  };
}

/**
 * A string that represents a date/time format.
 */
declare type DateString = string;

declare type StatusString = 'pending' | 'processed' | 'hold';

declare type OdometerUnit = 'km' | 'mi';

declare namespace DataTable {
  /**
   * @property {function} getProp Passes the row data so you can retrieve any containing value that you need, and return it for the template to render.
   */
  type Column<RowType = any> = {
    prop?: string;
    getProp?: (row: RowType) => string | number;
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
  type SortParameter = {
    property: string;
    direction: string;
  };
}

declare namespace API {
  /**
   * Filter used to search data by property values.
   * Example: `?TableNames@column=value`
   */
  type Filter = {
    table: string;
    column: string;
    value: string;
  };

  /**
   * @param DataType Typeset of the retrieved data from the API. Example: `Invoice[]`.
   * @param Paginated Boolean value whether the response will hold the `pagination` object.
   */
  type DefaultResponse<DataType = any, Paginated = false> = {
    data: DataType;
    message?: string;
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
  type GetDataFunction<ResponseType = any, Paginated = false> = (
    page?: number,
    sort?: DataTable.SortParameter[],
    filters?: API.Filter[]
  ) => Promise<DefaultResponse<ResponseType, Paginated>>;

  /**
   * @description Abstract functon type of specific entity data getter by ID that serves the information of a singular entity.
   * @see DefaultResponse for parameter descriptions.
   */
  type GetByIdFunction<ResponseType = any> = (
    id: number | string
  ) => Promise<DefaultResponse<ResponseType>>;

  /**
   * @description Abstract function type of data update functions that update data types like `Invoice`.
   * @param DataType Type to be given as POST data to API.
   * @param ResponseType Type to be responded by the API.
   */
  type UpdateDataFunction<DataType = any, ResponseType = any> = (
    id: number,
    data: DataType
  ) => Promise<DefaultResponse<ResponseType>>;

  type RemoveDataFunction = (id: number) => Promise<boolean>;

  type CreateDataFunction<DataType = any, ResponseType = any> = (
    data: DataType
  ) => Promise<DefaultResponse<ResponseType>>;
}

declare namespace Entities {
  type Invoice<Relations = true> = {
    created: DateString;
    extension: string;
    file_name: string;
    id: number;
    maintenance: Relations extends true ? Maintenance<Relations> : undefined;
    maintenance_id: number;
    modified: DateString;
    status: StatusString;
  };

  type Categories<Relations = true> = {
    id: number;
    name: string;
    created: DateString;
    modified: DateString;
  };

  type Maintenance<Relations = true> = {
    created: string;
    garage_id: number;
    id: number;
    modified: string;
    status: StatusString;
    vehicle: Relations extends true ? Vehicle<Relations> : undefined;
    vehicle_id: number;
    total_price: number;
    type: string;
    odometer: number;
    odometer_unit: OdometerUnit;
    note: string;
    date: DateString;
  };

  type MaintenanceLine<Relations = true> = {
    created: string;
    id: number | string;
    modified: string;
    name: string;
    categorie_id: number;
    maintenance_id: number;
  };

  type Vehicle<Relations = true> = {
    brand: string;
    color: string;
    construction_year: string;
    created: string;
    fuel_type: string;
    id: number;
    license_plate: string;
    model: string;
    modified: string;
    power: string;
    declare: string;
    user: Relations extends true ? User : undefined;
    user_id: number;
    vin: string;
  };

  type User = {
    created: string;
    email: string;
    first_name: string;
    id: number;
    is_admin: boolean;
    last_name: string;
    modified: string;
    status: 'active' | 'inactive';
  };
}
