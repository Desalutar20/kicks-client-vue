<script lang="ts" setup>
import { useProviderFilters } from '@/core/composables/use-filters'
import { ROUTE_NAMES } from '@/core/const/router.const'
import AdminFilters from '@/modules/admin/components/AdminFilters.vue'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'

import { ADMIN_BRANDS_FILTERS } from '@/modules/admin/modules/brands/const/admin-brands-injection-keys.const'
import { getAdminBrandsSchema } from '@/modules/admin/modules/brands/schemas/get-admin-brands.schema'
import { GET_ADMIN_BRANDS_MAX_LIMIT } from '../const/admin-brands-schemas.const'
import AdminBrandsTable from '@/modules/admin/modules/brands/components/AdminBrandsTable.vue'
import CreateUpdateBrandForm from '@/modules/admin/modules/brands/components/CreateUpdateBrandForm.vue'
import AppButton from '@/core/components/ui/AppButton.vue'

useProviderFilters(getAdminBrandsSchema, ROUTE_NAMES.admin.brands, ADMIN_BRANDS_FILTERS)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <AdminHeading title="Brands List" :breadcrumb="['Home', 'Brands']" />

      <div :class="$style.filterContainer">
        <CreateUpdateBrandForm>
          <template #default="props">
            <AppButton variant="third" @click="props.openDialog">Create brand</AppButton>
          </template>
        </CreateUpdateBrandForm>
        <AdminFilters
          :injectionKey="ADMIN_BRANDS_FILTERS"
          title="Brands filters"
          :keys="[
            {
              key: 'search',
              label: 'Search',
              placeholder: 'Search by name',
              type: { inputType: 'input' },
              transform: (val) => val,
            },
            {
              key: 'limit',
              label: 'Rows per page',
              placeholder: 'Rows per page',
              type: {
                inputType: 'select',
                options: Array.from(
                  { length: Math.floor(GET_ADMIN_BRANDS_MAX_LIMIT / 25) },
                  (_, i) => (i + 1) * 25,
                ).map((v) => ({ value: v.toString(), label: v.toString() })),
              },
              transform: (val) => Number(val),
            },
          ]"
        />
      </div>
    </div>
    <AdminBrandsTable />
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
  margin-bottom: 40px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 40px;
}
</style>
