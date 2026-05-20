<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import AppInput from '@/core/components/ui/AppInput.vue'
import { useInjectFilters } from '@/core/composables/use-filters'
import { useGetProductSkusFilterOptions } from '@/modules/products/composables/use-get-product-skus-filter-options'
import { PRODUCT_SKU_FILTERS } from '@/modules/products/const/admin-brands-injection-keys.const'
import type { GetProductSkusInput } from '@/modules/products/schemas/get-product-skus.schema'
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, Slider } from 'primevue'
import { watch } from 'vue'

type FilterKey = Extract<
  keyof GetProductSkusInput,
  'sizes' | 'colors' | 'categoryIds' | 'brandIds' | 'genders'
>

type FilterValue<K extends FilterKey> =
  NonNullable<GetProductSkusInput[K]> extends Array<infer T> ? T : never

const emit = defineEmits<{
  click: []
}>()

const { data } = useGetProductSkusFilterOptions()
const { lazyFilters, filters, isEqual, setFilter, resetFilters, applyFilters } =
  useInjectFilters(PRODUCT_SKU_FILTERS)

watch(
  [lazyFilters, filters],
  ([l, f]) => {
    console.log(JSON.stringify(l))
    console.log(JSON.stringify(f))
  },
  { immediate: true },
)

const onChange = <K extends FilterKey>(key: K, option: FilterValue<K>) => {
  const current = lazyFilters[key] ?? []

  if (current.includes(option as never)) {
    const filtered = current.filter((val) => val !== option)

    //@ts-expect-error...
    setFilter(key, filtered.length === 0 ? undefined : filtered)
    return
  }

  setFilter(key, [...current, option] as GetProductSkusInput[K])
}

const onPriceChange = (value: number[]) => {
  const [min = 0, max = 0] = value

  if (max - min < 50) return

  lazyFilters.minPrice = min
  lazyFilters.maxPrice = max
}
</script>

<template>
  <div :class="$style.filters" v-if="data?.data && data.data.sizes.length > 0">
    <Accordion :value="[]" multiple :class="$style.accordion">
      <AccordionPanel :class="$style.accordionPanel" value="0">
        <AccordionHeader :class="$style.accordionHeader">SIZE</AccordionHeader>
        <AccordionContent :class="$style.accordionContent">
          <ul :class="$style.sizeColorList">
            <li v-for="size in data.data.sizes" :key="size">
              <AppButton
                :class="[$style.size, { [$style.active]: lazyFilters.sizes?.includes(size) }]"
                variant="ghost"
                @click="() => onChange('sizes', size)"
                >{{ size }}</AppButton
              >
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel :class="$style.accordionPanel" value="1">
        <AccordionHeader :class="$style.accordionHeader">COLOR</AccordionHeader>
        <AccordionContent :class="$style.accordionContent">
          <ul :class="$style.sizeColorList">
            <li v-for="color in data.data.colors" :key="color">
              <AppButton
                :class="[$style.color, { [$style.active]: lazyFilters.colors?.includes(color) }]"
                variant="ghost"
                :style="{ backgroundColor: color }"
                @click="() => onChange('colors', color)"
              ></AppButton>
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel :class="$style.accordionPanel" value="2">
        <AccordionHeader :class="$style.accordionHeader">CATEGORY</AccordionHeader>
        <AccordionContent :class="$style.accordionContent">
          <ul :class="$style.categoryBrandList">
            <li v-for="{ id, name } in data.data.categories" :key="id">
              <label>
                <AppInput
                  @update:model-value="(val) => onChange('categoryIds', id)"
                  :checked="lazyFilters.categoryIds?.includes(id)"
                  type="checkbox"
                />
                {{ name }}
              </label>
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel :class="$style.accordionPanel" value="3">
        <AccordionHeader :class="$style.accordionHeader">BRAND</AccordionHeader>
        <AccordionContent :class="$style.accordionContent">
          <ul :class="$style.categoryBrandList">
            <li v-for="{ id, name } in data.data.brands" :key="id">
              <label>
                <AppInput
                  @update:model-value="() => onChange('brandIds', id)"
                  :checked="lazyFilters.brandIds?.includes(id)"
                  type="checkbox"
                />
                {{ name }}
              </label>
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel :class="$style.accordionPanel" value="4">
        <AccordionHeader :class="$style.accordionHeader">GENDER</AccordionHeader>
        <AccordionContent :class="$style.accordionContent">
          <ul :class="$style.categoryBrandList">
            <li v-for="gender in data.data.genders" :key="gender">
              <label>
                <AppInput
                  @update:model-value="() => onChange('genders', gender)"
                  :checked="lazyFilters.genders?.includes(gender)"
                  type="checkbox"
                />
                {{ gender }}
              </label>
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>

      <AccordionPanel :class="$style.accordionPanel" value="5">
        <AccordionHeader :class="$style.accordionHeader">PRICE</AccordionHeader>
        <AccordionContent :class="$style.accordionContent">
          <div :class="$style.price">
            <div :class="$style.priceValues">
              <span>${{ lazyFilters.minPrice ?? data.data.minPrice }}</span>
              <span>${{ lazyFilters.maxPrice ?? data.data.maxPrice }}</span>
            </div>
            <Slider
              :modelValue="[
                lazyFilters.minPrice ?? data.data.minPrice,
                lazyFilters.maxPrice ?? data.data.maxPrice,
              ]"
              @update:model-value="(val) => onPriceChange(val as number[])"
              :min="data.data.minPrice"
              :max="data.data.maxPrice"
              :step="1"
              range
            />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <div :class="$style.btns">
      <AppButton
        :disabled="Object.keys(lazyFilters).length === 0"
        @click="
          () => {
            resetFilters()
            emit('click')
          }
        "
        >Reset</AppButton
      >
      <AppButton
        @click="
          () => {
            applyFilters()
            emit('click')
          }
        "
        :disabled="isEqual"
        variant="third"
        >Apply</AppButton
      >
    </div>
  </div>
</template>

<style module>
.filters {
  min-width: 320px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
}

.accordion {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;
}

.accordionPanel {
  border: 0 !important;
}

.accordionHeader {
  font-weight: 600 !important;
  text-transform: uppercase;
  border: 0 !important;
  margin-bottom: 18px !important;
}

.accordionContent div {
  border: 0 !important;
}

.sizeColorList {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-height: 250px;
  overflow-y: auto;

  li {
    width: fit-content;
  }

  .size {
    width: 48px;
    height: 48px;
    font-size: 14px !important;
    letter-spacing: 0.02em;
    color: var(--dark-gray);
    background-color: var(--white) !important;
  }

  .size.active {
    color: var(--white) !important;
    background: var(--dark-gray) !important;
  }

  .color {
    position: relative;
    width: 48px;
    height: 48px;
    font-size: 14px !important;
    letter-spacing: 0.02em;
    transition: transform 0.3s ease;
  }

  .color.active {
    border-color: var(--dark-gray);
    transform: scale(1.05);
  }

  .color.active::after {
    content: '✓';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: white;
    mix-blend-mode: difference;
  }
}

.categoryBrandList {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  max-height: 200px;
  overflow-y: scroll;

  label {
    cursor: pointer;
    display: flex;
    column-gap: 16px;
    font-family: var(--second-family);
    font-weight: 600;
  }
}

.price {
  display: flex;
  flex-direction: column;
  row-gap: 18px;
}

.priceValues {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-family: var(--second-family);
    font-weight: 600;
    font-size: 15px;
  }
}
.btns {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;

  button {
    width: 100% !important;
  }
}
</style>
