export default httpClient => ({

  profile: async ({ username, password }) => {
    const response = await httpClient.get('/users/me')

    return {
      data: response.data
    }
  }
})
