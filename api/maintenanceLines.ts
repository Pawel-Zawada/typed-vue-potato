import axios from 'axios';

const baseurl = '/admin/api/maintenance_lines';

//@ts-ignore
export const getMaintenanceLinesByMaintenance: any = async (
  maintenanceId: number | string
) => {
  const response: {
    data: API.DefaultResponse<Entities.MaintenanceLine, true>;
  } = await axios.get(
    `${baseurl}?MaintenanceLines@maintenance_id=${maintenanceId}`
  );

  if (response.data.status === 'success') {
    return response.data;
  }

  throw new Error(response.data.message);
};

export const updateMaintenanceLines: API.UpdateDataFunction<
  Partial<Entities.MaintenanceLine<false>>,
  boolean
> = async (id, data) => {
  const response: {
    data: API.DefaultResponse<boolean>;
  } = await axios.put(`${baseurl}/${id}`, data);

  if (response.data.status === 'success') {
    return response.data;
  }

  throw new Error(response.data.message);
};

export const addMaintenanceLines: API.CreateDataFunction<
  Partial<Entities.MaintenanceLine<false>>,
  boolean
> = async data => {
  const response: {
    data: API.DefaultResponse<boolean>;
  } = await axios.post(`${baseurl}`, data);

  if (response.data.status === 'success') {
    return response.data;
  }

  throw new Error(response.data.message);
};

export const removeMaintenanceLines: API.RemoveDataFunction = async (
  id: number
) => {
  const response: {
    data: API.DefaultResponse;
  } = await axios.delete(`${baseurl}/${id}`);

  return response.data.data;
};
