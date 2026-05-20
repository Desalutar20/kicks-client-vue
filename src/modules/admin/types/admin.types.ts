import type { z, ZodObject, ZodRawShape } from 'zod'

type BaseSchemaKey = {
  label: string
  placeholder: string
}

export type InputSchemaKey<
  T extends ZodObject<ZodRawShape>,
  K extends keyof z.infer<T>,
> = BaseSchemaKey & {
  key: K
  type: 'input'

  transform: (value: string) => z.infer<T>[K]
}

type SelectSchemaKey<
  T extends ZodObject<ZodRawShape>,
  K extends keyof z.infer<T>,
> = BaseSchemaKey & {
  key: K
  type: 'select'

  options: {
    value: string
    label: string
    isDefault?: boolean
  }[]
  transform: (value: string) => z.infer<T>[K]
}

type RangeSchemaKey<
  T extends ZodObject<ZodRawShape>,
  MinKey extends keyof z.infer<T>,
  MaxKey extends keyof z.infer<T>,
> = BaseSchemaKey & {
  type: 'range'
  options: {
    min: number
    max: number
    step?: number
  }
  keys: {
    min: MinKey
    max: MaxKey
  }
  transform: (value: number[]) => {
    min: z.infer<T>[MinKey]
    max: z.infer<T>[MaxKey]
  }
}

export type SchemaKeys<T extends ZodObject<ZodRawShape>> =
  | {
      [K in keyof z.infer<T>]: InputSchemaKey<T, K> | SelectSchemaKey<T, K>
    }[keyof z.infer<T>]
  | RangeSchemaKey<T, keyof z.infer<T>, keyof z.infer<T>>
