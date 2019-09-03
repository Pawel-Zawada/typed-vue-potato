import axios from 'axios';

const baseurl = '/admin/api/categories';

export const getCategories: API.GetDataFunction<
  Entities.Categories[],
  true
> = async (page = 1, sort?: DataTable.SortParameter[]) => {
  const sortingString = '';
  if (sort) {
    sort.map(
      ({ property, direction }) => `&sort=${property}&direction=${direction}`
    );
  }

  const response: {
    data: API.DefaultResponse<Entities.Categories[], true>;
  } = await axios.get(`${baseurl}${`?page=${page}`}${sortingString}`);
  return response.data;
};
