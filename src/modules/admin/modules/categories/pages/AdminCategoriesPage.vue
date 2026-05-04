<script lang="ts" setup>
import { useProviderFilters } from '@/core/composables/use-filters'
import { ROUTE_NAMES } from '@/core/const/router.const'
import AdminFilters from '@/modules/admin/components/AdminFilters.vue'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'

import AppButton from '@/core/components/ui/AppButton.vue'
import { getAdminCategoriesSchema } from '@/modules/admin/modules/categories/schemas/get-admin-categories.schema'
import { ADMIN_CATEGORIES_FILTERS } from '@/modules/admin/modules/categories/const/admin-categories-injection-keys.const'
import { GET_ADMIN_CATEGORIES_MAX_LIMIT } from '@/modules/admin/modules/categories/const/admin-categories-schemas.const'
import AdminCategoriesTable from '@/modules/admin/modules/categories/components/AdminCategoriesTable.vue'
import CreateUpdateCategoryForm from '@/modules/admin/modules/categories/components/CreateUpdateCategoryForm.vue'

useProviderFilters(getAdminCategoriesSchema, ROUTE_NAMES.admin.categories, ADMIN_CATEGORIES_FILTERS)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <AdminHeading title="Categories List" :breadcrumb="['Home', 'Categories']" />

      <div :class="$style.filterContainer">
        <CreateUpdateCategoryForm>
          <template #default="props">
            <AppButton variant="third" @click="props.openDialog">Create category</AppButton>
          </template>
        </CreateUpdateCategoryForm>
        <AdminFilters
          :injection-key="ADMIN_CATEGORIES_FILTERS"
          title="CATEGORIES filters"
          :keys="[
            {
              key: 'search',
              label: 'Search',
              placeholder: 'Serach by name',
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
                  { length: Math.floor(GET_ADMIN_CATEGORIES_MAX_LIMIT / 25) },
                  (_, i) => (i + 1) * 25,
                ).map((v) => ({ value: v.toString(), label: v.toString() })),
              },
              transform: (val) => Number(val),
            },
          ]"
        />
      </div>
    </div>
    <AdminCategoriesTable />
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
