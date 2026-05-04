export const isObjectsEqualSimple = (
  first: Record<string | number | symbol, unknown>,
  second: Record<string | number | symbol, unknown>,
) => JSON.stringify(first) === JSON.stringify(second)
