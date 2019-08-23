import axios from 'axios';

const baseurl = '/admin/api/invoices';

export const getInvoices = async (): Promise<Invoice[]> => {
  const response: {
    data: DefaultResponse;
  } = await axios.get(
    `${baseurl}?include_relations=Maintenances,Maintenances.Vehicles,Maintenances.Vehicles.Users&sort=Invoices.id&direction=desc`
  );
  return response.data.data;
};

export const getInvoiceDocument = async (id: number): Promise<string> => {
  const response = await axios({
    url: `${baseurl}/download/${id}`,
    method: 'GET',
    responseType: 'blob'
  });

  return response.data;
};

export const deleteInvoice = async (id: number): Promise<boolean> => {
  const response: {
    data: DefaultResponse;
  } = await axios.delete(`${baseurl}/${id}`);

  return response.data.data;
};
