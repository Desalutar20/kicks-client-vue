<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { useProviderFilters } from '@/core/composables/use-filters'
import { ROUTE_NAMES } from '@/core/const/router.const'
import { ProductGender } from '@/core/types/api/admin/admin-product.type'
import AdminFilters, { type SchemaKeys } from '@/modules/admin/components/AdminFilters.vue'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'
import AdminProductsWrapper from '@/modules/admin/modules/products/components/AdminProductsWrapper.vue'
import CreateUpdateProductForm from '@/modules/admin/modules/products/components/CreateUpdateProductForm.vue'
import { useGetAdminProductFilterOptions } from '@/modules/admin/modules/products/composables/use-get-admin-product-filter-options'
import { ADMIN_PRODUCTS_FILTERS } from '@/modules/admin/modules/products/const/admin-products-injection-keys.const'
import { GET_ADMIN_PRODUCTS_MAX_LIMIT } from '@/modules/admin/modules/products/const/admin-products-schemas.const'
import { getAdminProductsSchema } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const { data } = useGetAdminProductFilterOptions()
useProviderFilters(getAdminProductsSchema, ROUTE_NAMES.admin.products, ADMIN_PRODUCTS_FILTERS)

const filterKeys = computed(() => {
  const keys: SchemaKeys<typeof getAdminProductsSchema>[] = [
    {
      key: 'search',
      label: 'Search',
      placeholder: 'Search by name or email',
      type: { inputType: 'input' },
      transform: (val) => val,
    },
    {
      key: 'gender',
      label: 'Gender',
      placeholder: 'Gender',
      type: {
        inputType: 'select',
        options: [
          { label: 'All', value: 'all' },
          ...Object.values(ProductGender).map((g) => ({ value: g, label: g })),
        ],
      },
      transform: (val) => (val === 'all' ? undefined : (val as ProductGender)),
    },
    {
      key: 'isDeleted',
      label: 'Deleted',
      placeholder: 'Deleted status',
      type: {
        inputType: 'select',
        options: [
          { label: 'All', value: 'all' },
          { label: 'Deleted', value: 'true' },
          { label: 'Not deleted', value: 'false' },
        ],
      },
      transform: (val) => (val === 'all' ? undefined : val === 'true'),
    },
  ]

  if (data.value?.data.availableBrands.length) {
    keys.push({
      key: 'brandId' as const,
      label: 'Brand',
      placeholder: 'Brand',
      type: {
        inputType: 'select',
        options: [
          { label: 'All', value: 'all' },
          ...data.value.data.availableBrands.map((b) => ({ label: b.name, value: b.id })),
        ],
      },
      transform: (val: string) => (val === 'all' ? undefined : val),
    })
  }

  if (data.value?.data.availableCategories.length) {
    keys.push({
      key: 'categoryId' as const,
      label: 'Category',
      placeholder: 'Category',
      type: {
        inputType: 'select',
        options: [
          { label: 'All', value: 'all' },
          ...data.value.data.availableCategories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        ],
      },
      transform: (val: string) => (val === 'all' ? undefined : val),
    })
  }

  keys.push({
    key: 'limit',
    label: 'Rows per page',
    placeholder: 'Rows per page',
    type: {
      inputType: 'select',
      options: Array.from(
        { length: Math.floor(GET_ADMIN_PRODUCTS_MAX_LIMIT / 25) },
        (_, i) => (i + 1) * 25,
      ).map((v) => ({ value: v.toString(), label: v.toString() })),
    },
    transform: (val) => Number(val),
  })

  return keys
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <AdminHeading title="Products List" :breadcrumb="['Home', 'All Products']" />

      <div :class="$style.filterContainer">
        <div :class="$style.formContainer">
          <CreateUpdateProductForm>
            <template #default="props">
              <AppButton variant="third" @click="props.openDialog">Create product</AppButton>
            </template>
          </CreateUpdateProductForm>
          <RouterLink :to="{ name: ROUTE_NAMES.admin.productSkus }" :class="$style.link"
            >Variants</RouterLink
          >
        </div>
        <AdminFilters
          :injectionKey="ADMIN_PRODUCTS_FILTERS"
          title="Product filters"
          :keys="filterKeys"
        />
      </div>
    </div>
    <AdminProductsWrapper />
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

.link {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 24px;

  border: 1px solid var(--dark-gray);
  border-radius: 8px;

  background-color: var(--white);
  color: var(--dark-gray);

  font-weight: 500;
  text-decoration: none;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.link:hover {
  background-color: var(--gray);
  border-color: var(--dark-gray-hover);
  color: var(--dark-gray-hover);
}

.link:active {
  transform: scale(0.98);
}
</style>
