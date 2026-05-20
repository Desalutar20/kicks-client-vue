<script lang="ts" setup>
import type { ProductSkuWithVariants } from '@/core/types/api/products/product.type'
import { Galleria, Image } from 'primevue'
import { computed, ref } from 'vue'
import { isNewProduct } from '../utils/product-sku.util'
import { ROUTE_NAMES } from '@/core/const/router.const'
import AppButton from '@/core/components/ui/AppButton.vue'

const { data } = defineProps<{
  data: ProductSkuWithVariants
}>()
const loadedImages = ref<Record<string, boolean>>({})

const colors = computed(
  () => data.variants.find((variant) => variant.productSkuId === data.productSku.id)?.colors ?? [],
)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.galleria">
        <Galleria
          :value="data.productSku.images"
          :showItemNavigators="false"
          :showThumbnailNavigators="false"
        >
          <template #item="slotProps">
            <img
              :class="[
                $style.slideImage,
                { [$style.hidden]: !loadedImages[slotProps.item.imageUrl] },
              ]"
              :src="slotProps.item.imageUrl"
              :alt="slotProps.item.imageName"
              style="width: 100%"
            />
          </template>
          <template #thumbnail="slotProps">
            <img
              :class="[
                $style.thumbnailImage,
                { [$style.hidden]: !loadedImages[slotProps.item.imageUrl] },
              ]"
              :src="slotProps.item.imageUrl"
              :alt="slotProps.item.imageName"
              @load="loadedImages[slotProps.item.imageUrl] = true"
            />
          </template>
        </Galleria>
      </div>
      <div :class="$style.images">
        <Image
          v-for="{ imageId, imageName, imageUrl } in data.productSku.images"
          :key="imageId"
          :src="imageUrl"
          :alt="imageName"
          preview
          @load="loadedImages[imageUrl] = true"
          :class="[$style.image, { [$style.hidden]: !loadedImages[imageUrl] }]"
        />
      </div>
    </div>
    <div :class="$style.right">
      <div :class="$style.title">
        <p>{{ data.productSku.product.title }}</p>

        <div :class="$style.price">
          <template v-if="data.productSku.salePrice">
            <span :class="$style.salePrice"> ${{ data.productSku.salePrice }} </span>

            <span :class="[$style.currentPrice, $style.strikethrough]">
              ${{ data.productSku.price }}
            </span>
          </template>

          <template v-else>
            <span :class="$style.singlePrice"> ${{ data.productSku.price }} </span>
          </template>
        </div>
      </div>

      <div :class="$style.colorsSizeContainer">
        <span style="font-weight: 600">Color</span>
        <ul :class="$style.colors">
          <li
            v-for="color in colors"
            :key="color.productSkuId"
            :class="{ [$style.active]: color.productSkuId === data.productSku.id }"
          >
            <RouterLink
              :disabled="color.productSkuId === data.productSku.id"
              :class="[$style.color, { [$style.disabled]: !color.inStock }]"
              :style="{ backgroundColor: color.color }"
              :to="{
                name: ROUTE_NAMES.products.specificProduct,
                params: { id: color.productSkuId },
              }"
            />
          </li>
        </ul>
      </div>

      <div :class="$style.colorsSizeContainer">
        <span>Size</span>
        <ul :class="$style.sizes">
          <li v-for="size in data.variants" :key="size.productSkuId">
            <RouterLink
              :disabled="size.productSkuId === data.productSku.id"
              :class="[
                $style.size,
                {
                  [$style.disabled]: !size.inStock,
                  [$style.active]: data.productSku.id === size.productSkuId,
                },
              ]"
              :to="{
                name: ROUTE_NAMES.products.specificProduct,
                params: { id: size.productSkuId },
              }"
              >{{ size.size }}</RouterLink
            >
          </li>
        </ul>
      </div>

      <div :class="$style.btns">
        <AppButton>Add to cart</AppButton>
        <AppButton variant="third">Buy it now</AppButton>
      </div>

      <div :class="$style.about">
        <span>About the product</span>
        <p>{{ data.productSku.product.description }}</p>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.images {
  display: none;
}

.slideImage {
  height: 273px;
  margin-bottom: 24px;
  border-radius: 18px;
}

.thumbnailImage {
  border-radius: 8px;
}

.hidden {
  opacity: 0;
}

.image:first-child img {
  border-radius: 48px 0 0 0;
}

.image:nth-child(2) img {
  border-radius: 0 48px 0 0;
}

.image:nth-child(3) img {
  border-radius: 0 0 0 48px;
}

.image:nth-child(4) img {
  border-radius: 0 0 48px 0;
}

.right {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  max-width: 430px;
}

.title {
  p {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  span {
    font-weight: 600;
    font-size: 24px;
    color: var(--blue);
  }

  .price {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-top: 6px;
  }

  .salePrice {
    font-size: 26px;
    font-weight: 800;
    color: var(--blue);
  }

  .currentPrice {
    font-size: 18px;
    font-weight: 500;
    color: var(--dark-gray);
  }

  .strikethrough {
    text-decoration: line-through;
    opacity: 0.5;
  }
}

.colorsSizeContainer {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  span {
    font-weight: 600;
  }
}

.colors {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;

  li.active {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;

    border: 3px solid var(--dark-gray);
    border-radius: 50%;
  }
}

.color {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 100%;
}

.color:hover {
  transform: scale(1.1);
}

.color.disabled {
  opacity: 0.25;
  filter: grayscale(1);
  pointer-events: none;
}

.sizes {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.size {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  background: var(--white);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.size.active {
  background: var(--dark-gray);
  color: var(--white);
}

.size.disabled {
  background: #d2d1d3;
  color: #8f8c91;
}

.btns {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  button {
    width: 100%;
    padding: 16px !important;
  }
}

.about {
  span {
    font-weight: 600;
    text-transform: uppercase;
  }

  p {
    font-family: var(--second-family);
    opacity: 0.8;
  }
}

@media (min-width: 600px) {
  .slideImage {
    height: 350px;
  }
}

@media (min-width: 768px) {
  .title {
    p {
      font-size: 32px;
      margin-bottom: 16px;
    }
  }

  .colorsSizeContainer {
    span {
      text-transform: uppercase;
    }
  }

  .colors {
    li.active {
      width: 48px;
      height: 48px;
    }
  }

  .color {
    width: 32px;
    height: 32px;
  }
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    row-gap: 0;
    column-gap: 16px;
  }

  .left {
    flex: 0 1 70%;
  }

  .right {
    row-gap: 32px;
    flex: 1;
  }

  .galleria {
    display: none;
  }

  .images {
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 429px));
    grid-template-rows: repeat(2, clamp(300px, 40vw, 510px));
    gap: 16px;
  }
}
</style>
