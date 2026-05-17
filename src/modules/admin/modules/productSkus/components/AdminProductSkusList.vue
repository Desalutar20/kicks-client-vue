<script lang="ts" setup>
import Spinner from '@/core/components/ui/Spinner.vue'
import { useInjectFilters } from '@/core/composables/use-filters'
import AdminCursorPagination from '@/modules/admin/components/AdminCursorPagination.vue'
import type { GetAdminProductsInput } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'
import { useGetAdminProductSkus } from '@/modules/admin/modules/productSkus/composables/use-get-admin-product-skus'
import { ADMIN_PRODUCT_SKUS_FILTERS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-injection-keys.const'
import AdminProductSku from '@/modules/admin/modules/productSkus/components/AdminProductSku.vue'

const { filters, setFilter } = useInjectFilters(ADMIN_PRODUCT_SKUS_FILTERS)
const { data, isPending, isFetching } = useGetAdminProductSkus(filters)

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
    <ul :class="$style.list" :style="{ opacity: isPending ? 0.8 : 1 }">
      <li v-for="value in data.data" :key="value.id">
        <AdminProductSku :productSku="value" />
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

.pagination {
  margin-top: 40px;
}

.list {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 390px));
  grid-auto-rows: 1fr;
  gap: 24px;

  li {
    > div {
      height: 100%;
    }
  }
}

@media screen and (max-width: 500px) {
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
