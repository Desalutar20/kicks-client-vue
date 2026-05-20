<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

import AppButton from '@/core/components/ui/AppButton.vue'

import ProductSku from '@/modules/products/components/ProductSku.vue'
import ProductSkuSkeleton from '@/modules/products/components/ProductSkuSkeleton.vue'

import { useGetProductSkus } from '@/modules/products/composables/use-get-product-skus'

import type { ProductSku as TProductSku } from '@/core/types/api/products/product.type'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import useEmblaCarousel, { type EmblaCarouselVueType } from 'embla-carousel-vue'
import type { RefValue } from '@/core/types/util.type'
import { useResizeObserver } from '@vueuse/core'

const { productSkuId, categoryId } = defineProps<{
  productSkuId: TProductSku['id']
  categoryId?: AdminCategory['id']
}>()

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: false })

const { data, isPending, isFetching } = useGetProductSkus(
  computed(() => ({
    limit: 16,
    categoryIds: categoryId ? [categoryId] : undefined,
  })),
)

const items = computed(() => (data.value?.data ?? []).filter((p) => p.id !== productSkuId))

const mid = ref(items.value.length)

const prevButtonDisabled = ref(true)
const nextButtonDisabled = ref(true)

const toggleButtonsDisabled = (emblaApi: NonNullable<RefValue<EmblaCarouselVueType[1]>>) => {
  prevButtonDisabled.value = !emblaApi.canScrollPrev()
  nextButtonDisabled.value = !emblaApi.canScrollNext()
}

const width = ref(0)

useResizeObserver(document.body, () => {
  console.log(window.innerWidth)
  width.value = window.innerWidth
})

watchEffect(() => {
  mid.value = width.value < 768 ? Math.ceil(items.value.length / 2) : items.value.length
})

watchEffect((cleanup) => {
  if (!emblaApi.value) return

  toggleButtonsDisabled(emblaApi.value)

  emblaApi.value.on('select', toggleButtonsDisabled)
  emblaApi.value.on('reInit', toggleButtonsDisabled)

  cleanup(() => {
    emblaApi.value?.off('select', toggleButtonsDisabled)
    emblaApi.value?.off('reInit', toggleButtonsDisabled)
  })
})
</script>

<template>
  <section :class="$style.wrapper">
    {{ width }}
    <div :class="$style.header">
      <h2>You may also like</h2>

      <div :class="$style.controls">
        <AppButton
          variant="primary"
          @click="
            () => {
              emblaApi?.scrollPrev()
              emblaApi2?.scrollPrev()
            }
          "
          :disabled="isPending || isFetching || prevButtonDisabled"
        >
          <ChevronLeft />
        </AppButton>

        <AppButton
          variant="primary"
          @click="
            () => {
              emblaApi?.scrollNext()
              emblaApi2?.scrollNext()
            }
          "
          :disabled="isPending || isFetching || nextButtonDisabled"
        >
          <ChevronRight />
        </AppButton>
      </div>
    </div>

    <div class="embla">
      <div :class="$style.embla__viewport" ref="emblaRef">
        <div :class="$style.embla__container">
          <div v-if="isPending || isFetching">
            <ProductSkuSkeleton v-for="n in 8" :key="n" />
          </div>

          <div
            v-else
            :class="$style.embla__slide"
            v-for="data in items.slice(0, mid)"
            :key="data.id"
          >
            <ProductSku :productSku="data" />
          </div>
        </div>
      </div>
    </div>

    <div :class="['embla', $style.mobile]">
      <div :class="$style.embla__viewport" ref="emblaRef2">
        <div :class="$style.embla__container">
          <div v-if="isPending || isFetching">
            <ProductSkuSkeleton v-for="n in 8" :key="n" />
          </div>

          <div v-else :class="$style.embla__slide" v-for="data in items.slice(mid)" :key="data.id">
            <ProductSku :productSku="data" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.wrapper {
  width: 100%;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--dark-gray);
}

.controls {
  display: flex;
  gap: 10px;
}

.embla__viewport {
  overflow: hidden;
  max-width: var(--container-max-width);
}

.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}

.embla__slide {
  flex: 0 0 50%;
  min-width: 0;
}

.mobile {
  margin-top: 24px;
}
@media (min-width: 768px) {
  .mobile {
    display: none;
  }

  .header h2 {
    font-size: 48px;
  }

  .embla__slide {
    flex: 0 0 33.3%;
  }
}

@media (min-width: 1024px) {
  .embla__container {
    margin-left: calc(24px * -1);
  }

  .embla__slide {
    flex: 0 0 25%;
    padding-left: 24px;
  }
}
</style>
