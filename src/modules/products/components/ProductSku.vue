<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { ROUTE_NAMES } from '@/core/const/router.const'
import type { ProductSku } from '@/core/types/api/products/product.type'
import { getDiscountPercent } from '@/core/utils/pricing.util'
import { isNewProduct } from '@/modules/products/utils/product-sku.util'
import { Carousel, Tag } from 'primevue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { productSku } = defineProps<{
  productSku: ProductSku
}>()

const loadedImages = ref<Record<string, boolean>>({})
const isOutOfStock = computed(() => productSku.quantity === 0)

const router = useRouter()
</script>

<template>
  <article :class="[$style.container, { [$style.disabled]: isOutOfStock }]">
    <div :class="$style.images">
      <Carousel
        :value="productSku.images"
        :showIndicators="true"
        :showNavigators="false"
        circular
        :numVisible="1"
        :numScroll="1"
      >
        <template #item="slotProps">
          <div :class="$style.imageContainer">
            <Tag
              v-if="isOutOfStock"
              :class="[$style.tag, $style.outOfStock]"
              value="Out of stock"
              rounded
            />
            <Tag
              v-else-if="productSku.salePrice"
              :class="$style.tag"
              :value="getDiscountPercent(productSku.price, productSku.salePrice) + '% off'"
              rounded
            />
            <Tag
              v-else-if="isNewProduct(productSku.createdAt)"
              :class="$style.tag"
              value="New"
              rounded
            />

            <div v-if="!loadedImages[slotProps.data.imageUrl]" :class="$style.skeleton" />
            <img
              :src="slotProps.data.imageUrl"
              :alt="slotProps.data.imageName"
              @load="loadedImages[slotProps.data.imageUrl] = true"
              :class="{ [$style.hidden]: !loadedImages[slotProps.data.imageUrl] }"
            />
          </div>
        </template>
      </Carousel>
    </div>
    <p :class="$style.title">{{ productSku.product.title }}</p>
    <AppButton
      @click="
        router.push({
          name: ROUTE_NAMES.products.specificProduct,
          params: { id: productSku.id },
          ...(productSku.product.categoryId
            ? { query: { categoryId: productSku.product.categoryId } }
            : {}),
        })
      "
      variant="primary"
    >
      View Product -
      <span :class="$style.sale" v-if="productSku.salePrice"
        >${{ productSku.salePrice }} (<span style="text-decoration: line-through">{{
          productSku.price
        }}</span
        >)</span
      >
      <span v-else>${{ productSku.price }}</span>
    </AppButton>
  </article>
</template>

<style module>
.container {
  min-width: 270px;
  max-width: 330px;
  width: 100%;
}

.images {
  padding: 8px;
  border-radius: 28px;
  background-color: var(--fa-white);
  margin-bottom: 20px;
  overflow: hidden;
}

.imageContainer {
  position: relative;
  overflow: hidden;
  border-radius: 24px;

  img {
    height: 300px;
  }

  .tag {
    position: absolute;
    border-radius: 24px 0;
    padding: 8px 16px;
    background: var(--yellow);
    font-weight: 600;
    font-size: 12px;
  }
}

.skeleton {
  width: 100%;
  background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 24px;
}

.hidden {
  opacity: 0;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 16px;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
  filter: grayscale(0.6);
}

.sale {
  color: var(--yellow);
}

.outOfStock {
  background: #232321;
  color: #fff;
}
</style>
