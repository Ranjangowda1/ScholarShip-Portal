export async function apiRequest(url, method = 'GET', body = null, headers = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') !== -1;
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      throw new Error(error);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
