<script setup lang="ts">
import OAuthButtons from '@/modules/auth/components/OAuthButtons.vue'
import AppInput from '@/core/components/ui/AppInput.vue'
import {
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/const/auth-schemas.const.ts'
import AppButton from '@/core/components/ui/AppButton.vue'
import { ArrowRight } from '@lucide/vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import { useSignUp } from '@/modules/auth/composables/use-sign-up.ts'
import TermsText from '@/modules/auth/components/TermsText.vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import { UserGender } from '@/core/types/api/admin/admin-user.type'

const {
  r$,
  mutation: { mutate, isPending },
} = useSignUp()

const onSubmit = () => {
  if (!r$.$correct) return
  mutate(r$.$value)
}
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Register</h1>

    <div :class="$style.innerContainer">
      <span :class="$style.description">Sign up with</span>

      <OAuthButtons />

      <form @submit.prevent="onSubmit">
        <fieldset :disabled="isPending" :class="$style.fieldset">
          <span :class="$style.or">or</span>

          <div :class="$style.inputContainer">
            <span :class="$style.field">Your Name</span>

            <FormInput
              placeholder="First Name"
              :field="r$.firstName"
              v-model="r$.$value.firstName"
              required
              :maxlength="FIRST_NAME_MAX_LENGTH"
            />

            <FormInput
              placeholder="Last Name"
              :field="r$.lastName"
              v-model="r$.$value.lastName"
              required
              :maxlength="LAST_NAME_MAX_LENGTH"
            />
          </div>

          <div :class="$style.inputContainer">
            <span>Gender</span>

            <div :class="$style.genderContainer">
              <label
                v-for="gender in Object.values(UserGender)"
                :key="gender"
                :class="$style.gender"
              >
                <AppInput
                  required
                  type="radio"
                  name="gender"
                  :value="gender"
                  v-model="r$.gender.$value"
                />
                {{ gender }}
              </label>
            </div>
          </div>

          <div :class="$style.inputContainer">
            <span :class="$style.field">Login Details</span>

            <FormInput
              placeholder="Email"
              :field="r$.email"
              v-model="r$.$value.email"
              type="email"
              required
              :maxlength="EMAIL_MAX_LENGTH"
            />

            <div :class="$style.password">
              <FormInput
                placeholder="Password"
                :field="r$.password"
                v-model="r$.$value.password"
                type="password"
                required
                :minlength="PASSWORD_MIN_LENGTH"
                :maxlength="PASSWORD_MAX_LENGTH"
              />

              <span :class="$style.passwordHint">
                Minimum 8 characters with at least one uppercase, one lowercase, one special
                character and a number
              </span>
            </div>
          </div>

          <div :class="$style.inputContainer">
            <label :class="$style.terms">
              <AppInput type="checkbox" required />
              <TermsText type="signUp" />
            </label>
          </div>

          <AppButton :disabled="!r$.$correct || isPending">
            Register
            <template #icon>
              <Spinner v-if="isPending" variant="secondary" />
              <ArrowRight v-else :size="20" />
            </template>
          </AppButton>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<style module>
.container {
  max-width: 480px;
  width: 100%;
}

.title {
  font-weight: 600;
  font-size: 24px;
}

.innerContainer {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.description {
  font-family: var(--second-family);
  font-weight: 600;
}

.fieldset {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 0;
}

.or {
  font-weight: 600;
  font-size: 20px;
  font-family: var(--second-family);
  text-transform: uppercase;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.inputContainer span {
  font-weight: 600;
  font-size: 20px;
}

.field {
  font-weight: 600;
  font-size: 20px;
}

.genderContainer {
  display: flex;
  align-items: center;
  column-gap: 32px;
}

.gender {
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-weight: 600;
  font-family: var(--second-family);
  text-transform: capitalize;
}

.password {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.passwordHint {
  font-size: 12px !important;
  letter-spacing: 0.03em;
  color: #36323b;
}

.terms {
  display: flex;
  align-items: start;
  column-gap: 8px;
  font-family: var(--second-family);
}

.terms div {
  width: 40px;
}

@media screen and (min-width: 768px) {
  .title {
    color: var(--dark-gray);
    font-size: 36px;
  }

  .innerContainer {
    row-gap: 24px;
  }

  .fieldset {
    row-gap: 24px;
  }

  .description {
    font-size: 20px;
  }

  .inputContainer {
    row-gap: 20px;
  }

  .inputContainer span {
    font-size: 24px;
  }

  .field {
    font-size: 24px;
  }

  .terms span {
    font-size: 16px;
  }
}
</style>
