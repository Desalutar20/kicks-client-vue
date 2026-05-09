<script lang="ts" setup generic="TSchema extends ZodObject<ZodRawShape>">
import { ref, type InjectionKey } from 'vue'
import { type FiltersInjectionKey, useInjectFilters } from '@/core/composables/use-filters'
import { type ZodObject, type ZodRawShape, type z } from 'zod'
import { useBodyClass } from '@/core/composables/use-body-class'
import { Drawer } from 'primevue'
import AppButton from '@/core/components/ui/AppButton.vue'
import { FilterIcon } from '@lucide/vue'
import AppInput from '@/core/components/ui/AppInput.vue'
import AppSelect from '@/core/components/ui/AppSelect.vue'

export type SchemaKeys<T extends ZodObject<ZodRawShape>> = {
  [K in keyof z.infer<T>]: {
    key: K
    label: string
    placeholder: string
    type:
      | { inputType: 'input' }
      | { inputType: 'select'; options: { value: string; label: string; isDefault?: boolean }[] }
    transform: (value: string) => z.infer<T>[K]
  }
}[keyof z.infer<T>]

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
          <div v-for="{ key, label, placeholder, type, transform } in keys" :key="key">
            <div v-if="type.inputType == 'input'" :class="$style.inputContainer">
              <label :class="$style.label" :for="key.toString()">{{ label }}</label>
              <AppInput
                :id="key"
                :placeholder="placeholder"
                :model-value="lazyFilters[key]"
                @update:model-value="
                  (value) => setFilter(key, value?.trim() ? transform(value) : undefined)
                "
              />
            </div>

            <div v-if="type.inputType == 'select'" :class="$style.inputContainer">
              <label :class="$style.label" :for="key.toString()">{{ label }}</label>
              <AppSelect
                :options="type.options"
                :placeholder="placeholder"
                :model-value="lazyFilters[key]"
                @update:model-value="(value: string) => setFilter(key, transform(value))"
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
