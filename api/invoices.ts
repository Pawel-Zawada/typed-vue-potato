import axios from 'axios';

export const getInvoices = async (): Promise<Invoice[]> => {
  const {
    data: { data }
  } = await axios.get(
    '/admin/api/invoices?include_relations=Maintenances,Maintenances.Vehicles,Maintenances.Vehicles.Users&sort=Invoices.id&direction=desc'
  );
  return data;
};
