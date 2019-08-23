import axios from 'axios';

const baseurl = '/admin/api/invoices';

export const getInvoices = async (): Promise<Invoice[]> => {
  const {
    data: { data }
  } = await axios.get(
    `${baseurl}?include_relations=Maintenances,Maintenances.Vehicles,Maintenances.Vehicles.Users&sort=Invoices.id&direction=desc`
  );
  return data;
};

export const getInvoiceDocument = async (id: number): Promise<string> => {
  const { data } = await axios({
    url: `${baseurl}/download/${id}`,
    method: 'GET',
    responseType: 'blob'
  });

  return data;
};
