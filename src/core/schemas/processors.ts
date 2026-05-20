import z from 'zod'

export const arrayable = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => {
    if (val === undefined || val === null) return undefined

    let arr: unknown[] = []

    if (Array.isArray(val)) {
      arr = val
    } else if (typeof val === 'string') {
      arr = val.split(',') // 🔥 вот это ключ
    } else {
      arr = [val]
    }

    return arr.map((v) => (typeof v === 'string' ? decodeURIComponent(v) : v))
  }, z.array(schema))
