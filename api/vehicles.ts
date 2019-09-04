import axios from 'axios';

const baseurl = '/admin/api/vehicles';

export const getVehicles: API.GetDataFunction<
  Entities.Vehicle[],
  true
> = async (page = 1, sort?: DataTable.SortParameter[]) => {
  let sortingString = '';
  if (sort) {
    sortingString = sort
      .map(
        ({ property, direction }) => `&sort=${property}&direction=${direction}`
      )
      .join();
  }

  const response: {
    data: API.DefaultResponse<Entities.Vehicle[], true>;
  } = await axios.get(`${baseurl}${`?page=${page}`}${sortingString}`);
  return response.data;
};
