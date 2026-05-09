<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import AppSelect from '@/core/components/ui/AppSelect.vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import { ROUTE_NAMES } from '@/core/const/router.const'
import { ProductGender } from '@/core/types/api/admin/admin-product.type'
import { isObjectsEqualSimple } from '@/core/utils/compare-objects.util'
import { createBrandSchema } from '@/modules/admin/modules/brands/schemas/create-brand.schema'
import { useCreateProduct } from '@/modules/admin/modules/products/composables/use-create-product'
import { useGetAdminProductFilterOptions } from '@/modules/admin/modules/products/composables/use-get-admin-product-filter-options'
import {
  ADMIN_PRODUCT_DESCRIPTION_MAX_LENGTH,
  ADMIN_PRODUCT_TAGS_MAX_LENGTH,
  ADMIN_PRODUCT_TITLE_MAX_LENGTH,
} from '@/modules/admin/modules/products/const/admin-products-schemas.const'
import {
  updateProductSchema,
  type UpdateProductInput,
} from '@/modules/admin/modules/products/schemas/update-product.schema'
import { useRegleSchema } from '@regle/schemas'
import { Dialog, MultiSelect } from 'primevue'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppInput from '@/core/components/ui/AppInput.vue'
import type { CreateProductInput } from '@/modules/admin/modules/products/schemas/create-product.schema'
import { useUpdateProduct } from '@/modules/admin/modules/products/composables/use-update-product'

const { updateData } = defineProps<{
  updateData?: UpdateProductInput
}>()

const { r$ } = useRegleSchema(
  updateData
    ? {
        ...updateData,
        brandId: updateData.brandId ?? undefined,
        categoryId: updateData.categoryId ?? undefined,
      }
    : {
        title: '',
        description: '',
        gender: undefined,
        tags: [],
        brandId: undefined,
        categoryId: undefined,
      },
  updateData ? updateProductSchema : createBrandSchema,
)

const { data, isPending } = useGetAdminProductFilterOptions()
const { mutate, isPending: isCreatePending } = useCreateProduct()
const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateProduct()
const visible = ref(false)

const tagOptions = computed(() =>
  [...(data.value?.data.tags ?? []), ...r$.$value.tags!].map((t) => ({ label: t, value: t })),
)
const open = () => {
  visible.value = true
}

defineExpose({ open })

const isUnavailable = computed(
  () =>
    !data.value || data.value.data.brands.length === 0 || data.value.data.categories.length === 0,
)

const action = computed(() => (updateData ? 'Update' : 'Create'))
const noChanges = computed(() =>
  !updateData ? false : isObjectsEqualSimple(r$.$value, updateData),
)

const onSubmit = () => {
  console.log(r$.$dirty)
  if (r$.$dirty) return

  if (r$.$value.id) {
    updateMutate(r$.$value as UpdateProductInput)
  } else {
    mutate(r$.$value as CreateProductInput)
  }

  r$.$reset({
    toInitialState: true,
  })

  visible.value = false
}
const newTag = ref('')

const addTag = () => {
  if (!newTag.value) return

  const exists = r$.$value.tags!.includes(newTag.value)

  if (!exists) {
    r$.$value.tags = [...r$.$value.tags!, newTag.value]
  }

  newTag.value = ''
}
</script>

<template>
  <slot :openDialog="() => (visible = true)"></slot>

  <Dialog v-model:visible="visible" :class="$style.dialog" modal>
    <div :class="$style.unavailable" v-if="isUnavailable">
      <p>You can’t {{ action.toLowerCase() }} a product yet</p>

      <p>
        Please create at least one&nbsp;
        <span>brand</span>&nbsp;and&nbsp;
        <span>category</span>
      </p>

      <div :class="$style.links">
        <RouterLink :to="ROUTE_NAMES.admin.brands">Create brand</RouterLink>
        <RouterLink :to="ROUTE_NAMES.admin.categories">Create category</RouterLink>
      </div>
    </div>

    <form @submit.prevent="onSubmit" v-else>
      <div :class="$style.container">
        <FormInput
          :class="$style.input"
          :disabled="isPending || isCreatePending || isUpdatePending"
          placeholder="Title"
          :field="r$.title!"
          v-model="r$.$value.title"
          required
          :maxlength="ADMIN_PRODUCT_TITLE_MAX_LENGTH"
        />

        <FormInput
          :class="$style.input"
          :disabled="isPending || isCreatePending"
          placeholder="Description"
          :field="r$.description!"
          v-model="r$.$value.description"
          required
          :maxlength="ADMIN_PRODUCT_DESCRIPTION_MAX_LENGTH"
        />

        <AppSelect
          :options="Object.values(ProductGender).map((g) => ({ label: g, value: g }))"
          placeholder="Gender"
          :model-value="r$.gender?.$value"
          @update:model-value="(value: string) => (r$.gender!.$value = value as ProductGender)"
        />

        <AppSelect
          :options="data!.data.categories.map((g) => ({ label: g.name, value: g.id }))"
          placeholder="Category"
          :model-value="r$.categoryId?.$value"
          @update:model-value="(value: string) => (r$.categoryId!.$value = value)"
        />

        <AppSelect
          :options="data!.data.brands.map((g) => ({ label: g.name, value: g.id }))"
          placeholder="Brand"
          :model-value="r$.brandId?.$value"
          @update:model-value="(value: string) => (r$.brandId!.$value = value)"
        />

        <MultiSelect
          :class="$style.select"
          :model-value="r$.tags!.$value"
          @update:model-value="(v: string[]) => (r$.tags!.$value = v)"
          :options="tagOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Tags"
          :maxSelectedLabels="3"
          :allowEmpty="true"
          :selectionLimit="5"
          :disabled="r$.$value.tags!.length === ADMIN_PRODUCT_TAGS_MAX_LENGTH"
        />
        <AppInput v-model="newTag" placeholder="Add new tag" @keydown.enter="addTag" />
      </div>
      <AppButton
        @click="onSubmit"
        type="button"
        :disabled="isUnavailable || isPending || isCreatePending || noChanges"
        variant="third"
        >{{ action }} product</AppButton
      >
    </form>
  </Dialog>
</template>

<style module>
.dialog {
  max-width: 600px !important;
}

.unavailable {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  text-align: center;

  p {
    font-size: 14px;

    span {
      font-weight: 500;
    }
  }

  p:first-child {
    color: oklch(0.552 0.016 285.938);
  }
}

.links {
  display: flex;
  justify-content: center;
  column-gap: 24px;
  font-size: 14px;

  a {
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
      color: var(--dark-gray);
    }
  }
}

.container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 40px;
  row-gap: 30px;
  margin: 20px 0 20px 0;
}

.select {
  border-radius: 8px !important;
  border: 1px solid var(--dark-gray) !important;
  background: transparent;
  padding: 10px 10px;
}
</style>
