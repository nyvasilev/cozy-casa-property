const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN || null

export const endpoints = {
  api: baseUrl,
  properties: {
    getData: { url: `${baseUrl}/properties`, method: 'GET' },
    getProperty: { url: (id) => `${baseUrl}/properties/${id}`, method: 'GET' },
  },
}
