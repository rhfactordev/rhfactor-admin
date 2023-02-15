export default httpClient => ({
  publish: async ({ site }) => {
    const response = await httpClient.post(`/admin/v1/site/${site}/republish`)
    let errors = null

    console.log('response', response)

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }
    return {
      data: response.data,
      errors
    }
  }
})
