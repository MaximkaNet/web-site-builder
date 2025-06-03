const CODES: Record<number, string> = {
  400: "Bad request",
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Page Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
}

export const fromStatusCode = (code: number) => {
  return CODES[code] ?? "Something went wrong"
}