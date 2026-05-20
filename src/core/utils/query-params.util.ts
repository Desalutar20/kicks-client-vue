export const buildQueryParams = <T extends Record<string, unknown>>(
  params: T,
  excludedKeys?: (keyof T)[],
) => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue

    const shouldEncode = !excludedKeys?.includes(key)

    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, shouldEncode ? encodeURIComponent(String(item)) : item)
      }
      continue
    }

    searchParams.append(key, shouldEncode ? encodeURIComponent(String(value)) : String(value))
  }

  return searchParams
}
