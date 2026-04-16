<script setup lang="ts">
import { useForgotPassword } from '@/modules/auth/composables/use-forgot-password.ts'
import FormInput from '@/core/components/ui/FormInput.vue'
import { EMAIL_MAX_LENGTH } from '@/modules/auth/const/auth-schemas.const.ts'
import { ArrowRight } from '@lucide/vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import AppButton from '@/core/components/ui/AppButton.vue'

const {
  r$,
  mutation: { mutateAsync, asyncStatus },
} = useForgotPassword()

const onSubmit = async (e: SubmitEvent) => {
  e.preventDefault()
  if (!r$.$correct) return

  await mutateAsync(r$.$value)
}
</script>

<template>
  <form @submit="onSubmit" :class="$style.form">
    <h1 :class="$style.title">Forgot Password</h1>
    <p :class="$style.text">
      Enter your email and we will send you instructions to reset your password.
    </p>

    <FormInput
      placeholder="Email"
      :field="r$.email"
      v-model="r$.$value.email"
      type="email"
      required
      :maxlength="EMAIL_MAX_LENGTH"
      :class="$style.input"
    />

    <AppButton :disabled="!r$.$correct || asyncStatus == 'loading'"
      >Send reset link
      <template #icon>
        <ArrowRight v-if="asyncStatus === 'idle'" :size="20" />
        <Spinner v-else variant="secondary" />
      </template>
    </AppButton>
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
