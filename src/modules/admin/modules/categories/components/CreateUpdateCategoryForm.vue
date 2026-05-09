<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import { useCreateCategory } from '@/modules/admin/modules/categories/composables/use-create-category'
import { useUpdateCategory } from '@/modules/admin/modules/categories/composables/use-update-category'
import { ADMIN_CATEGORY_NAME_MAX_LENGTH } from '@/modules/admin/modules/categories/const/admin-categories-schemas.const'
import { createCategorySchema } from '@/modules/admin/modules/categories/schemas/create-category.schema'
import {
  updateCategorySchema,
  type UpdateCategoryInput,
} from '@/modules/admin/modules/categories/schemas/update-category.schema'
import { useRegleSchema } from '@regle/schemas'
import { Dialog } from 'primevue'
import { computed, ref } from 'vue'

const { updateData } = defineProps<{
  updateData?: UpdateCategoryInput
}>()

const { r$ } = useRegleSchema(
  updateData ? { ...updateData } : {},
  updateData ? updateCategorySchema : createCategorySchema,
)

const { mutate, isPending } = useCreateCategory()
const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateCategory()

const visible = ref(false)

const onSubmit = () => {
  if (r$.$invalid) return

  if ('id' in r$.$value) {
    updateMutate(r$.$value as UpdateCategoryInput)
  } else {
    mutate(r$.$value)
  }

  r$.$reset({
    toInitialState: true,
  })

  visible.value = false
}

const action = computed(() => (updateData ? 'Update' : 'Create'))

const open = () => {
  visible.value = true
}

defineExpose({ open })
</script>

<template>
  <slot :openDialog="() => (visible = true)"></slot>
  <Dialog v-model:visible="visible" :class="$style.dialog" modal>
    <form @submit.prevent="onSubmit" :class="$style.form">
      <FormInput
        :class="$style.input"
        :disabled="isPending || isUpdatePending"
        placeholder="Name"
        :field="r$.name"
        v-model="r$.$value.name"
        required
        :maxlength="ADMIN_CATEGORY_NAME_MAX_LENGTH"
      />
      <div :class="$style.btns">
        <AppButton type="button" variant="secondary" @click="visible = false">Cancel</AppButton>
        <AppButton
          :disabled="
            isPending || isUpdatePending || (updateData && r$.$value.name === updateData.name)
          "
          variant="third"
          >{{ isPending || isUpdatePending ? 'Loading...' : `${action} Category` }}
        </AppButton>
      </div>
    </form>
  </Dialog>
</template>

<style module>
.form {
  margin-top: 20px;
}

.title {
  margin-bottom: 20px;
}

.input {
  margin-bottom: 20px;
}

.btns {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 8px;

  button {
    width: 100% !important;
  }
}
</style>
