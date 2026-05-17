<script lang="ts" setup>
import Spinner from '@/core/components/ui/Spinner.vue'
import { ROUTE_NAMES } from '@/core/const/router.const'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'
import CreateUpdateProductSkuForm from '@/modules/admin/modules/productSkus/components/CreateUpdateProductSkuForm.vue'
import { useGetAdminProductSku } from '@/modules/admin/modules/productSkus/composables/use-get-admin-product-sku'
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-toastflow'

const route = useRoute()
const router = useRouter()

const { data, isPending } = useGetAdminProductSku(route.params.id as string)

watchEffect(() => {
  if (!isPending && !data.value) {
    toast.error('Something went wrong')
    router.push({ name: ROUTE_NAMES.admin.productSkus })
  }
})
</script>

<template>
  <div :class="$style.container">
    <AdminHeading
      title="Products List"
      :breadcrumb="[
        'Home',
        { label: 'Product Skus', to: ROUTE_NAMES.admin.productSkus },
        'Update Product Variant',
      ]"
    />
    <div v-if="isPending" :class="$style.loadingContainer">
      <Spinner size="xl" />
    </div>
    <CreateUpdateProductSkuForm v-if="data?.data" :action="{ type: 'update', data: data.data }" />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 300px;
}
</style>
