<script setup lang="ts">
import AppTable from '@/core/components/ui/AppTable.vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import { useInjectFilters } from '@/core/composables/use-filters'
import AdminCursorPagination from '@/modules/admin/components/AdminCursorPagination.vue'
import AdminBrandActions from '@/modules/admin/modules/brands/components/AdminBrandActions.vue'
import { useGetAdminBrands } from '@/modules/admin/modules/brands/composables/use-get-admin-brands'
import { ADMIN_BRANDS_FILTERS } from '@/modules/admin/modules/brands/const/admin-brands-injection-keys.const'
import type { GetAdminBrandsInput } from '@/modules/admin/modules/brands/schemas/get-admin-brands.schema'

const { filters, setFilter } = useInjectFilters(ADMIN_BRANDS_FILTERS)
const { data, isPending, isFetching } = useGetAdminBrands(filters)

const navigate = (
  key: Extract<keyof GetAdminBrandsInput, 'prevCursor' | 'nextCursor'>,
  cursor: string,
) => {
  setFilter(key, cursor)
}
</script>

<template>
  <div v-if="isPending" :class="$style.loadingContainer">
    <Spinner size="xl" />
  </div>

  <div
    v-if="data"
    :style="{ opacity: isFetching ? 0.6 : 1, pointerEvents: isFetching ? 'none' : 'auto' }"
  >
    <AppTable
      v-if="data"
      :data="data.data"
      :class="$style.table"
      :columns="[
        { key: 'id', header: 'ID' },
        { key: 'createdAt', header: 'Created At' },
        { key: 'updatedAt', header: 'Updated At' },
        { key: 'name', header: 'Name' },
      ]"
    >
      <template #actions="props">
        <AdminBrandActions :brand-id="props.row.id" :brand-name="props.row.name" />
      </template>
    </AppTable>

    <AdminCursorPagination
      :class="$style.pagination"
      :next-cursor="data.nextCursor"
      :prev-cursor="data.prevCursor"
      @prev="() => navigate('prevCursor', data!.prevCursor!)"
      @next="() => navigate('nextCursor', data!.nextCursor!)"
    />
  </div>
</template>

<style module>
.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 300px;
}

.pagination {
  margin-top: 40px;
}
</style>
