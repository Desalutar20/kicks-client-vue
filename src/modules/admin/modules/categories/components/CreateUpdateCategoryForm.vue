<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import { useCreateUpdateCategory } from '@/modules/admin/modules/categories/composables/use-create-update-category'
import { ADMIN_CATEGORY_NAME_MAX_LENGTH } from '@/modules/admin/modules/categories/const/admin-categories-schemas.const'
import { type UpdateCategoryInput } from '@/modules/admin/modules/categories/schemas/update-category.schema'
import { Dialog } from 'primevue'
import { computed, ref } from 'vue'

const { updateData } = defineProps<{
  updateData?: UpdateCategoryInput
}>()

const visible = ref(false)

const { r$, onSubmit, isPending } = useCreateUpdateCategory(updateData, {
  onSuccess: () => (visible.value = false),
})

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
        :disabled="isPending"
        placeholder="Name"
        :field="r$.name"
        v-model="r$.$value.name"
        required
        :maxlength="ADMIN_CATEGORY_NAME_MAX_LENGTH"
      />
      <div :class="$style.btns">
        <AppButton type="button" variant="secondary" @click="visible = false">Cancel</AppButton>
        <AppButton
          :disabled="isPending || (updateData && r$.$value.name === updateData.name)"
          variant="third"
          >{{ isPending ? 'Loading...' : `${action} Category` }}
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
