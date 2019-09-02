import axios from 'axios';

const baseurl = '/admin/api/maintenances';

export const updateMaintenance: API.UpdateDataFunction<
  Partial<Entities.Maintenance<false>>,
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
