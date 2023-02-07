import { defaultPagination } from '@/config'

export default httpClient => ({
  list: async ({ resource, page, size, sort } = defaultPagination) => {
    console.log('crud.list', resource, page, size, sort)

    const query = { page, size }
    if (sort) {
      query.sort = sort
    }
    const response = await httpClient.get(`/admin/v1/${resource}`, { params: query })
    return {
      data: response.data
    }
  },
  findOne: async ({ resource, id } = defaultPagination) => {
    const response = await httpClient.get(`/admin/v1/${resource}/${id}`)
    return {
      data: response.data
    }
  },

  create: async ({ resource, payload } = defaultPagination) => {
    const response = await httpClient.post(`/admin/v1/${resource}`, payload)
    return {
      data: response.data
    }
  },

  update: async ({ resource, id, payload } = defaultPagination) => {
    const response = await httpClient.put(`/admin/v1/${resource}/${id}`, payload)
    return {
      data: response.data
    }
  }

})
