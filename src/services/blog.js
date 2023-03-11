export default httpClient => ({
  categories: async ({ blogid }) => {
    console.log('blog.categories', blogid)
    const response = await httpClient.get(`/admin/v1/blog/${blogid}/category/all`)
    return {
      data: response.data
    }
  }
})
