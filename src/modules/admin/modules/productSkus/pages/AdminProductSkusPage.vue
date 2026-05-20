<script lang="ts" setup>
import { useProvideFilters } from '@/core/composables/use-filters'
import { COLORS } from '@/core/const/colors'
import { ROUTE_NAMES } from '@/core/const/router.const'
import AdminFilters from '@/modules/admin/components/AdminFilters.vue'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'
import AdminProductSkusList from '@/modules/admin/modules/productSkus/components/AdminProductSkusList.vue'
import { ADMIN_PRODUCT_SKUS_FILTERS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-injection-keys.const'
import { GET_ADMIN_PRODUCT_SKUS_MAX_LIMIT } from '@/modules/admin/modules/productSkus/const/admin-product-skus-schemas.const'
import { getAdminProductSkusSchema } from '@/modules/products/schemas/get-product-skus.schema'

useProvideFilters(
  getAdminProductSkusSchema,
  ROUTE_NAMES.admin.productSkus,
  ADMIN_PRODUCT_SKUS_FILTERS,
)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <AdminHeading
        title="Products Variants"
        :breadcrumb="['Home', { label: 'Products', to: ROUTE_NAMES.admin.products }, 'Variants']"
      />

      <AdminFilters
        :injectionKey="ADMIN_PRODUCT_SKUS_FILTERS"
        title="Product filters"
        :keys="[
          {
            key: 'sku',
            label: 'Sku',
            placeholder: 'Search by sku',
            type: 'input',
            transform: (val) => val,
          },
          {
            key: 'inStock',
            label: 'In Stock',
            placeholder: 'In stock',
            type: 'select',
            options: [
              { label: 'All', value: 'all' },
              { label: 'In stock', value: 'true' },
              { label: 'Not in stock', value: 'false' },
            ],
            transform: (val) => (val === 'all' ? undefined : val === 'true'),
          },
          {
            key: 'size',
            label: 'Size',
            placeholder: 'Search by size',
            type: 'input',
            transform: (val) => Number(val),
          },
          {
            key: 'color',
            label: 'Color',
            placeholder: 'Color',
            type: 'select',
            options: [
              { label: 'All', value: 'all' },
              ...Object.entries(COLORS).map(([k, v]) => ({ value: v, label: k })),
            ],
            transform: (val) => (val === 'all' ? undefined : val),
          },
          {
            label: 'Price',
            placeholder: 'Price',
            type: 'range',
            options: {
              min: 1,
              max: 10000,
            },
            keys: {
              min: 'minPrice',
              max: 'maxPrice',
            },
            transform: (values) => ({
              min: values[0],
              max: values[1],
            }),
          },

          {
            label: 'Sale Price',
            placeholder: 'Sale price',
            type: 'range',
            options: {
              min: 1,
              max: 10000,
            },
            keys: {
              min: 'minSalePrice',
              max: 'maxSalePrice',
            },
            transform: (values) => ({
              min: values[0],
              max: values[1],
            }),
          },

          {
            key: 'limit',
            label: 'Rows per page',
            placeholder: 'Rows per page',
            type: 'select',
            options: Array.from(
              { length: Math.floor(GET_ADMIN_PRODUCT_SKUS_MAX_LIMIT / 25) },
              (_, i) => (i + 1) * 25,
            ).map((v) => ({ value: v.toString(), label: v.toString() })),
            transform: (val) => Number(val),
          },
        ]"
      />
    </div>
    <AdminProductSkusList />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.filterContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 40px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 40px;
  margin-bottom: 40px;
}

.formContainer {
  display: flex;
  column-gap: 8px;
}
</style>
