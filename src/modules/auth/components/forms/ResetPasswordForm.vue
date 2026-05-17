<script setup lang="ts">
import FormInput from '@/core/components/ui/FormInput.vue'
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/const/auth-schemas.const.ts'
import { ArrowRight } from '@lucide/vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import AppButton from '@/core/components/ui/AppButton.vue'
import type { ResetPasswordInput } from '@/modules/auth/schemas/reset-password.schema.ts'
import { useResetPassword } from '@/modules/auth/composables/use-reset-password.ts'

const { data } = defineProps<{
  data: Pick<ResetPasswordInput, 'token' | 'email'>
}>()

const {
  r$,
  mutation: { mutate, isPending },
} = useResetPassword(data)

const onSubmit = async () => {
  const isValid = await r$.$validate()
  if (!isValid) return

  mutate(r$.$value)
}
</script>

<template>
  <form @submit.prevent="onSubmit" :class="$style.form">
    <h1 :class="$style.title">Reset Password</h1>
    <p :class="$style.text">Enter your new password to complete the reset process.</p>

    <fieldset :style="{ margin: 0, padding: 0 }" :disabled="isPending">
      <FormInput
        placeholder="New Password"
        :field="r$.newPassword"
        v-model="r$.$value.newPassword"
        type="password"
        required
        :minlength="PASSWORD_MIN_LENGTH"
        :maxlength="PASSWORD_MAX_LENGTH"
        :class="$style.input"
      />

      <FormInput
        placeholder="Password Confirm"
        :field="r$.newPasswordConfirm"
        v-model="r$.$value.newPasswordConfirm"
        type="password"
        required
        :class="$style.input"
      />

      <AppButton :disabled="r$.$invalid || isPending"
        >Reset password
        <template #icon>
          <Spinner v-if="isPending" variant="secondary" />
          <ArrowRight v-else :size="20" />
        </template>
      </AppButton>
    </fieldset>
  </form>
</template>

<style module>
.form {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 24px;
  border-radius: 24px;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: var(--white);
}

.title {
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin-bottom: 8px;
}

.text {
  text-align: center;
  font-size: 14px;
  margin-bottom: 8px;
  color: #9f9fa9;
}

.input {
  margin-bottom: 8px;
}

@media screen and (min-width: 768px) {
  .form {
    padding: 32px;
  }

  .title {
    font-size: 36px;
  }

  .text {
    font-size: 16px;
  }
}
</style>
