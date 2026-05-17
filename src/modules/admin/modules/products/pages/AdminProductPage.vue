<script lang="ts" setup>
import { ROUTE_NAMES } from '@/core/const/router.const'
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'
import CreateUpdateProductSkuForm from '@/modules/admin/modules/productSkus/components/CreateUpdateProductSkuForm.vue'
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const product = computed<AdminProduct>(() =>
  route.params.product ? JSON.parse(route.params.product as string) : null,
)

watchEffect(() => {
  if (!product.value) {
    router.push({ name: ROUTE_NAMES.admin.products })
  }
})
</script>

<template>
  <div :class="$style.container">
    <AdminHeading
      title="Products List"
      :breadcrumb="[
        'Home',
        { label: 'All Products', to: ROUTE_NAMES.admin.products },
        'Product Details',
      ]"
    />
    <CreateUpdateProductSkuForm v-if="product" :action="{ type: 'create', data: product }" />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
</style>
