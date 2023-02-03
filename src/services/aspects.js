export default httpClient => ({

  list: async ({ page = 0, size = 10, sort }) => {
    let uri = `/admin/v1/aspects?page=${page}&size=${size}`
    if (sort) {
      uri += `&sort=${sort}`
    }
    const response = await httpClient.get(uri)
    return {
      data: response.data
    }
  }
})
