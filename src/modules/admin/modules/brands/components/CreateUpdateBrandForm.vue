<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import { useCreateBrand } from '@/modules/admin/modules/brands/composables/use-create-brand'
import { useUpdateBrand } from '@/modules/admin/modules/brands/composables/use-update-brand'
import { ADMIN_BRAND_NAME_MAX_LENGTH } from '@/modules/admin/modules/brands/const/admin-brands-schemas.const'
import { createBrandSchema } from '@/modules/admin/modules/brands/schemas/create-brand.schema'
import {
  updateBrandSchema,
  type UpdateBrandInput,
} from '@/modules/admin/modules/brands/schemas/update-brand.schema'
import { useRegleSchema } from '@regle/schemas'
import { Dialog } from 'primevue'
import { computed, ref } from 'vue'

const { updateData } = defineProps<{
  updateData?: UpdateBrandInput
}>()

const { r$ } = useRegleSchema(
  updateData ? { ...updateData } : {},
  updateData ? updateBrandSchema : createBrandSchema,
)
const { mutate, isPending } = useCreateBrand()
const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateBrand()

const visible = ref(false)

const onSubmit = () => {
  if (r$.$invalid) return

  if ('id' in r$.$value) {
    updateMutate(r$.$value as UpdateBrandInput)
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
  <Dialog v-model:visible="visible" :class="$style.dialog" modal :header="`${action} Brand`">
    <form :class="$style.form">
      <FormInput
        :class="$style.input"
        :disabled="isPending || isUpdatePending"
        placeholder="Name"
        :field="r$.name"
        v-model="r$.$value.name"
        required
        :maxlength="ADMIN_BRAND_NAME_MAX_LENGTH"
      />
      <div :class="$style.btns">
        <AppButton type="button" variant="secondary" @click="visible = false">Cancel</AppButton>
        <AppButton
          :disabled="
            isPending || isUpdatePending || (updateData && r$.$value.name === updateData.name)
          "
          type="button"
          variant="third"
          @click="onSubmit"
          >{{ isPending || isUpdatePending ? 'Loading...' : `${action} Brand` }}
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
