<script lang="ts" setup generic="TSchema extends ZodObject<ZodRawShape>">
import { ref, type InjectionKey } from 'vue'
import { type FiltersInjectionKey, useInjectFilters } from '@/core/composables/use-filters'
import { type ZodObject, type ZodRawShape } from 'zod'
import { useBodyClass } from '@/core/composables/use-body-class'
import { Drawer, Slider } from 'primevue'
import AppButton from '@/core/components/ui/AppButton.vue'
import { FilterIcon } from '@lucide/vue'
import AppInput from '@/core/components/ui/AppInput.vue'
import AppSelect from '@/core/components/ui/AppSelect.vue'
import type { SchemaKeys } from '@/modules/admin/types/admin.types'

const { injectionKey, keys, title } = defineProps<{
  injectionKey: InjectionKey<FiltersInjectionKey<TSchema>>
  keys: SchemaKeys<TSchema>[]
  title: string
}>()

const { lazyFilters, setFilter, applyFilters, resetFilters, isEqual } =
  useInjectFilters(injectionKey)

const isVisible = ref(false)
useBodyClass('drawer-open', isVisible)
</script>

<template>
  <AppButton variant="ghost" @click="isVisible = true"><FilterIcon /></AppButton>
  <Drawer :style="{ width: '450px' }" blockScroll v-model:visible="isVisible" position="right">
    <template #container>
      <div :class="$style.container">
        <span :class="$style.title">
          {{ title }}
        </span>

        <div :class="$style.content">
          <div v-for="key in keys" :key="key.label">
            <div v-if="key.type == 'input'" :class="$style.inputContainer">
              <label :class="$style.label" :for="key.toString()">{{ key.label }}</label>
              <AppInput
                :id="key"
                :placeholder="key.placeholder"
                :model-value="lazyFilters[key.key]"
                @update:model-value="
                  (value) => setFilter(key.key, value?.trim() ? key.transform(value) : undefined)
                "
              />
            </div>

            <div v-if="key.type == 'select'" :class="$style.inputContainer">
              <label :class="$style.label" :for="key.toString()">{{ key.label }}</label>
              <AppSelect
                :options="key.options"
                :placeholder="key.placeholder"
                :model-value="lazyFilters[key.key]"
                @update:model-value="(value: string) => setFilter(key.key, key.transform(value))"
              />
            </div>

            <div v-if="key.type == 'range'" :class="$style.inputContainer">
              <label :class="$style.label" :for="key.toString()">{{ key.label }}</label>
              <Slider
                :modelValue="[lazyFilters[key.keys.min], lazyFilters[key.keys.max]]"
                @update:model-value="
                  (value) => {
                    const transformed = key.transform(value as number[])

                    setFilter(key.keys.min, transformed.min)
                    setFilter(key.keys.max, transformed.max)
                  }
                "
                :min="key.options.min"
                :max="key.options.max"
                :step="key.options.step ?? 1"
                range
              />
            </div>
          </div>
        </div>

        <div :class="$style.btns">
          <AppButton
            :disabled="Object.keys(lazyFilters).length === 0"
            @click="
              () => {
                resetFilters()
                isVisible = false
              }
            "
            >Reset</AppButton
          >
          <AppButton
            @click="
              () => {
                applyFilters()
                isVisible = false
              }
            "
            :disabled="isEqual"
            variant="third"
            >Apply</AppButton
          >
        </div>
      </div>
    </template>
  </Drawer>
</template>

<style module>
.custom {
  padding: 10px 12px;
  border-radius: 8px !;
  border: 1px solid var(--dark-gray);
  letter-spacing: 0.03em;
  color: var(--dark-gray);
  background-color: transparent;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  border-right: 16px solid transparent;
}
.container {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  background-color: white;
  height: 100%;
  padding: 24px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.content {
  display: grid;
  gap: 30px;
  align-content: start;
  flex: 1;
}

.inputContainer {
  display: grid;
  max-width: 100%;
  width: 100%;
  gap: 16px;
}

.label {
  font-size: 14px;
  line-height: 0;
  user-select: none;
  font-weight: 600;
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;

  button {
    width: 100% !important;
  }
}
</style>
