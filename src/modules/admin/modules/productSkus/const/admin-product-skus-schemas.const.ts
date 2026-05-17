import type z from 'zod'

export const GET_ADMIN_PRODUCT_SKUS_MAX_LIMIT = 100
export const GET_ADMIN_PRODUCT_SKUS_CURSOR_MAX_LENGTH = 100

export const ADMIN_PRODUCT_SKU_SKU_MAX_LENGTH = 30
export const ADMIN_PRODUCT_SKU_FILE_MAX_SIZE = 5 * 1024 * 1024
export const ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH = 4
export const ADMIN_PRODUCT_SKU_FILE_MIME_TYPES: z.util.MimeTypes[] = [
  'image/png',
  'image/jpeg',
  'image/webp',
]
