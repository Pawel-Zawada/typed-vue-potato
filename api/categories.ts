import axios from 'axios';

const baseurl = '/admin/api/categories';

export const getCategories: API.GetDataFunction<
  Entities.Categories[],
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
    data: API.DefaultResponse<Entities.Categories[], true>;
  } = await axios.get(`${baseurl}${`?page=${page}`}${sortingString}`);
  return response.data;
};
