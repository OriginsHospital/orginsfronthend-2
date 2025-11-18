export function requestInterceptor(accesstoken) {
  const { fetch: originalFetch } = window

  window.fetch = async (...args) => {
    const [resource, config] = args

    const response = await originalFetch(resource, {
      ...config,
    })
    // console.log('response$$$$', response.status)
    if (response.status == 401) {
      const currentPath = window.location.pathname + window.location.search
      if (currentPath !== '/login') {
        sessionStorage.setItem('redirectPath', currentPath)
      }

      window.location.replace('/login')
    }
    // Handle 403 Forbidden - redirect unauthorized users from revenue reports
    if (response.status == 403) {
      const currentPath = window.location.pathname
      if (
        currentPath === '/reports/revenue' ||
        currentPath === '/reports/revenueNew'
      ) {
        window.location.replace('/home')
      }
    }
    return response
  }
}
