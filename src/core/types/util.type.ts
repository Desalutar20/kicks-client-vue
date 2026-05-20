import type { Ref } from 'vue'

export type Nullable<T> = T | null

export type DeepStringValue<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? DeepStringValue<T[keyof T]>
    : never

export type RefValue<T> = T extends Ref<infer U> ? U : never
