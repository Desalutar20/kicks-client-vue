<script lang="ts" setup>
import { useParseQuery } from '@/core/composables/use-parse-query'
import { ROUTE_NAMES } from '@/core/const/router.const'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import { categoryIdSchema } from '@/modules/admin/modules/categories/schemas/category-id.schema'
import ProductRecommendations from '@/modules/products/components/ProductRecommendations.vue'
import ProductSkuDetails from '@/modules/products/components/ProductSkuDetails.vue'
import ProductSkuDetailsSkeleton from '@/modules/products/components/ProductSkuDetailsSkeleton.vue'
import { useGetProductSku } from '@/modules/products/composables/use-get-product-sku'
import { ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-toastflow'
import z from 'zod'

const route = useRoute()
const router = useRouter()

const isLoadedAtLeastOnce = ref(false)

const { data, isPending, isFetching } = useGetProductSku(() => route.params.id as string)
const query = useParseQuery(z.object({ categoryId: categoryIdSchema.optional() }), {
  options: { once: true },
})

watch(
  data,
  (d) => {
    if (d && !isLoadedAtLeastOnce.value) {
      isLoadedAtLeastOnce.value = true
    }
  },
  {},
)

watchEffect(() => {
  if (!isPending && !data.value) {
    toast.error('Something went wrong')
    router.push({ name: ROUTE_NAMES.products.root })
  }
})
</script>

<template>
  <ProductSkuDetailsSkeleton :class="$style.details" v-if="isPending || isFetching" />
  <ProductSkuDetails
    v-if="!isPending && !isFetching && data"
    :class="$style.details"
    :data="data.data"
  />

  <ProductRecommendations
    v-if="isLoadedAtLeastOnce && data"
    :productSkuId="data.data.productSku.id"
    :categoryId="(query.categoryId as AdminCategory['id']) ?? undefined"
  />
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.details {
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .details {
    margin-bottom: 128px;
  }
}
</style>
