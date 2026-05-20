<script setup lang="ts">
import ProductsHero from '@/modules/products/components/ProductsHero.vue'
import { useProvideFilters } from '../../../core/composables/use-filters'
import {
  getProductSkusSchema,
  type GetProductSkusInput,
} from '@/modules/products/schemas/get-product-skus.schema'
import { ROUTE_NAMES } from '@/core/const/router.const'
import { PRODUCT_SKU_FILTERS } from '@/modules/products/const/admin-brands-injection-keys.const'
import ProductSkusList from '@/modules/products/components/ProductSkusList.vue'
import ProductsFiltersWrapper from '@/modules/products/components/ProductsFiltersWrapper.vue'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import AppButton from '@/core/components/ui/AppButton.vue'

const { filters, setFilter } = useProvideFilters(
  getProductSkusSchema,
  ROUTE_NAMES.products.root,
  PRODUCT_SKU_FILTERS,
)

const navigate = (
  key: Extract<keyof GetProductSkusInput, 'prevCursor' | 'nextCursor'>,
  cursor: string,
) => {
  setFilter(key, cursor)
}
</script>

<template>
  <ProductsHero :class="$style.hero" />
  <div :class="$style.container">
    <ProductsFiltersWrapper />
    <ProductSkusList :filters="filters">
      <template #default="{ disabled, prevCursor, nextCursor }">
        <div :class="$style.btns">
          <AppButton
            v-if="prevCursor"
            :disabled="disabled"
            variant="secondary"
            style="flex-direction: row-reverse; padding: 8px"
            @click="navigate('prevCursor', prevCursor)"
            >Previous
            <template #icon>
              <ArrowLeft />
            </template>
          </AppButton>

          <AppButton
            v-if="nextCursor"
            :disabled="disabled"
            variant="secondary"
            style="padding: 8px"
            @click="navigate('nextCursor', nextCursor)"
            >Next
            <template #icon>
              <ArrowRight />
            </template>
          </AppButton>
        </div>
      </template>
    </ProductSkusList>
  </div>
</template>

<style module>
.hero {
  margin-bottom: 50px;
}

.container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.btns {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

@media (min-width: 768px) {
  .herp {
    margin-bottom: 32px;
  }

  .container {
    flex-direction: row;
    column-gap: 40px;
    row-gap: 0px;
  }
}
</style>
