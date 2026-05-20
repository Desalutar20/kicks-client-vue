<script lang="ts" setup>
import Spinner from '@/core/components/ui/Spinner.vue'
import ProductSku from '@/modules/products/components/ProductSku.vue'
import ProductSkuSkeleton from '@/modules/products/components/ProductSkuSkeleton.vue'
import { useGetProductSkus } from '@/modules/products/composables/use-get-product-skus'
import { GET_PRODUCT_SKUS_DEFAULT_LIMIT } from '@/modules/products/const/admin-brands-schemas.const'
import type { GetProductSkusInput } from '@/modules/products/schemas/get-product-skus.schema'
import { FilterX, PackageX } from '@lucide/vue'
import { computed } from 'vue'

const { filters, hideWhenNoData } = defineProps<{
  filters?: GetProductSkusInput
  hideWhenNoData?: boolean
}>()

const { data, isPending, isFetching } = useGetProductSkus(filters ?? {})

const hasFilters = computed(() => {
  return Object.values(filters ?? {}).some((v) => v !== undefined && v !== null && v !== '')
})

const hasProducts = computed(() => (data.value?.data?.length ?? 0) > 0)
</script>

<template>
  <div style="width: 100%" v-if="isPending" :class="$style.list">
    <ProductSkuSkeleton v-for="n in filters?.limit ?? GET_PRODUCT_SKUS_DEFAULT_LIMIT" :key="n" />
  </div>

  <div v-if="!isPending && data && !hasProducts && !hideWhenNoData" :class="$style.empty">
    <component :is="hasFilters ? FilterX : PackageX" :class="$style.icon" />

    <h3>
      {{ hasFilters ? 'Nothing found' : 'No products yet' }}
    </h3>

    <p>
      {{
        hasFilters
          ? 'Try changing or clearing filters'
          : 'Products will appear here once they are added'
      }}
    </p>
  </div>

  <div
    v-if="!isPending && data && hasProducts"
    :style="{
      opacity: isFetching ? 0.6 : 1,
      pointerEvents: isFetching ? 'none' : 'auto',
      width: '100%',
    }"
  >
    <ul :class="$style.list">
      <li v-for="value in data.data" :key="value.id">
        <ProductSku :productSku="value" />
      </li>
    </ul>

    <slot
      :prevCursor="data.prevCursor"
      :nextCursor="data.nextCursor"
      :disabled="isPending || isFetching"
    ></slot>
  </div>
</template>

<style module>
.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 300px;
  width: 100%;
}

.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: var(--gray-main);

  .icon {
    width: 72px;
    height: 72px;
    margin-bottom: 20px;
    opacity: 0.7;
  }

  h3 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--dark-gray);
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    max-width: 420px;
    opacity: 0.75;
    margin-bottom: 24px;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  justify-items: center;
  gap: 20px;
  margin-bottom: 40px;

  li {
    > article {
      height: 100%;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>
