export const isObjectsEqualSimple = (
  first: Record<string | number | symbol, unknown>,
  second: Record<string | number | symbol, unknown>,
) => JSON.stringify(first) === JSON.stringify(second)

export const getChangedFields = <T extends Record<string, unknown>>(
  first: T,
  second: Record<string, unknown>,
): Partial<T> => {
  const obj: Partial<T> = {}

  for (const key in first) {
    if (!Object.hasOwn(first, key) || first[key] === undefined || first[key] === second[key])
      continue

    obj[key] = first[key] as T[typeof key]
  }

  return obj
}
