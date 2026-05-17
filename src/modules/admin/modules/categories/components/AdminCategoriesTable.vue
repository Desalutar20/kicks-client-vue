<script setup lang="ts">
import AppTable from '@/core/components/ui/AppTable.vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import { useInjectFilters } from '@/core/composables/use-filters'
import AdminCursorPagination from '@/modules/admin/components/AdminCursorPagination.vue'
import { useGetAdminCategories } from '@/modules/admin/modules/categories/composables/use-get-admin-categories'
import { ADMIN_CATEGORIES_FILTERS } from '@/modules/admin/modules/categories/const/admin-categories-injection-keys.const'
import type { GetAdminCategoriesInput } from '@/modules/admin/modules/categories/schemas/get-admin-categories.schema'
import AdminCategoryActions from '@/modules/admin/modules/categories/components/AdminCategoryActions.vue'

const { filters, setFilter } = useInjectFilters(ADMIN_CATEGORIES_FILTERS)
const { data, isPending, isFetching } = useGetAdminCategories(filters)

const navigate = (
  key: Extract<keyof GetAdminCategoriesInput, 'prevCursor' | 'nextCursor'>,
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
        <AdminCategoryActions :category-id="props.row.id" :category-name="props.row.name" />
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
