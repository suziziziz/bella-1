export default ({ $axios, store }) => {
  // if (process.server) {
  $axios.interceptors.request.use(request => {
    if (request.url.match(/integration/g) && request.url.match(/integration/g).length > 0) {
      request.headers.common['Authorization'] = store.state.token.mf
    } else {
      request.headers.common['Authorization'] = store.state.token.panel
    }
    return request
  })
}
