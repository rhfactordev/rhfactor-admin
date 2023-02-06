import { defaultPagination } from '@/config'

export default httpClient => ({
  list: async ({ resource, page, size, sort } = defaultPagination) => {
    const query = { page, size }
    if (sort) {
      query.sort = sort
    }
    const response = await httpClient.get(`/admin/v1/${resource}`, { params: query })
    return {
      data: response.data
    }
  }
})
