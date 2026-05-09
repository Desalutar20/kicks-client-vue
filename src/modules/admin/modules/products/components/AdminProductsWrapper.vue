<script lang="ts" setup>
import Spinner from '@/core/components/ui/Spinner.vue'
import { CheckIcon, XIcon } from '@lucide/vue'
import AppTable from '@/core/components/ui/AppTable.vue'
import { useInjectFilters } from '@/core/composables/use-filters'
import AdminCursorPagination from '@/modules/admin/components/AdminCursorPagination.vue'
import { ADMIN_PRODUCTS_FILTERS } from '@/modules/admin/modules/products/const/admin-products-injection-keys.const'
import { useGetAdminProducts } from '@/modules/admin/modules/products/composables/use-get-admin-products'
import type { GetAdminProductsInput } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'
import AdminProductActions from '@/modules/admin/modules/products/components/AdminProductActions.vue'
import { useGetAdminProductFilterOptions } from '@/modules/admin/modules/products/composables/use-get-admin-product-filter-options'
import AdminProduct from '@/modules/admin/modules/products/components/AdminProduct.vue'

const { filters, setFilter } = useInjectFilters(ADMIN_PRODUCTS_FILTERS)
const { data, isPending, isFetching } = useGetAdminProducts(filters)
const { data: filterOptions } = useGetAdminProductFilterOptions()

const navigate = (
  key: Extract<keyof GetAdminProductsInput, 'prevCursor' | 'nextCursor'>,
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
        { key: 'title', header: 'Title' },
        { key: 'description', header: 'Description' },
        { key: 'gender', header: 'Gender' },
        { key: 'tags', header: 'Tags' },
        { key: 'categoryId', header: 'Category' },
        { key: 'brandId', header: 'Brand' },
        { key: 'isDeleted', header: 'Is Deleted' },
      ]"
    >
      <template #tags="props">
        <div :class="$style.tags">
          <span v-for="tag in props.row.tags" :key="tag">#{{ tag }}</span>
        </div>
      </template>
      <template #isDeleted="props">
        <CheckIcon
          v-if="props.row.isDeleted"
          :size="20"
          style="stroke: oklch(72.3% 0.219 149.579); margin-left: 20px"
        />
        <XIcon v-else :size="20" style="stroke: oklch(63.7% 0.237 25.331); margin-left: 20px" />
      </template>

      <template #categoryId="props">
        {{
          filterOptions?.data.categories.find((c) => c.id === props.row.categoryId)?.name ??
          props.row.categoryId
        }}
      </template>

      <template #brandId="props">
        {{
          filterOptions?.data.brands.find((b) => b.id === props.row.brandId)?.name ??
          props.row.brandId
        }}
      </template>
      <template #actions="props">
        <AdminProductActions :product="props.row" />
      </template>
    </AppTable>

    <ul :class="$style.list" :style="{ opacity: isPending ? 0.8 : 1 }">
      <li v-for="value in data.data" :key="value.id">
        <AdminProduct :product="value" />
      </li>
    </ul>
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

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  overflow: hidden;

  span {
    font-size: 12px;
    color: var(--blue);
    cursor: default;

    &:hover {
      columns: var(--blue-hover);
    }
  }
}

.list {
  display: none;
}

.pagination {
  margin-top: 40px;
}

@media screen and (max-width: 1500px) {
  .table {
    display: none !important;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    grid-auto-rows: 1fr !important;
    justify-items: center;
    gap: 24px;
  }
}

@media screen and (max-width: 500px) {
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
