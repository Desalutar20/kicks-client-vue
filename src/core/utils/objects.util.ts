export const isObjectsEqualSimple = (a: unknown, b: unknown): boolean => {
  if (a === b) return true

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.hasOwn(b, key)) return false

    //@ts-expect-error...
    const valA = a[key]
    //@ts-expect-error...
    const valB = b[key]

    const bothObjects = valA && valB && typeof valA === 'object' && typeof valB === 'object'

    if (bothObjects) {
      if (!isObjectsEqualSimple(valA, valB)) return false
    } else {
      if (valA !== valB) return false
    }
  }

  return true
}

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
