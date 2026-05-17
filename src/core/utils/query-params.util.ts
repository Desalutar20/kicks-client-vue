export const buildQueryParams = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue

    searchParams.append(key, String(value))
  }

  return searchParams
}
