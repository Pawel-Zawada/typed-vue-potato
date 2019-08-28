import axios from 'axios';

const baseurl = '/admin/api/invoices';

const getVariables =
  'include_relations=Maintenances,Maintenances.Vehicles,Maintenances.Vehicles.Users';

export const getInvoices: GetDataFunction<Invoice[], true> = async (
  page: number,
  sort?: DataTableSortParameter[]
) => {
  const sortingString = '';
  if (sort) {
    sort.map(
      ({ property, direction }) => `&sort=${property}&direction=${direction}`
    );
  }
  const response: {
    data: DefaultResponse<Invoice[], true>;
  } = await axios.get(
    `${baseurl}?${getVariables}${sortingString}&page=${page}`
  );
  return response.data;
};

export const getInvoiceDocument = async (id: number): Promise<string> => {
  const response = await axios({
    url: `${baseurl}/download/${id}`,
    method: 'GET',
    responseType: 'blob'
  });

  return response.data;
};

export const removeInvoice: RemoveDataFunction = async (id: number) => {
  const response: {
    data: DefaultResponse;
  } = await axios.delete(`${baseurl}/${id}`);

  return response.data.data;
};
