<script setup lang="ts">
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/modules/auth/const/auth-schemas.const.ts'
import AppButton from '@/core/components/ui/AppButton.vue'
import { ArrowRight } from '@lucide/vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import { useSignIn } from '@/modules/auth/composables/use-sign-in.ts'
import OAuthButtons from '@/modules/auth/components/OAuthButtons.vue'
import TermsText from '@/modules/auth/components/TermsText.vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'
import { type RouteLocationRaw, useRouter } from 'vue-router'
import { UserRole } from '@/core/types/api/admin/admin-user.type'

const { redirectPath } = defineProps<{ redirectPath?: string }>()
const router = useRouter()

const {
  r$,
  mutation: { mutate, isPending },
} = useSignIn({
  onSuccess: ({ data: user }) => {
    const location: RouteLocationRaw = redirectPath
      ? {
          path: redirectPath,
        }
      : {
          name: user.role === UserRole.Admin ? ROUTE_NAMES.admin.root : ROUTE_NAMES.home,
        }

    router.push(location)
  },
})

const onSubmit = () => {
  if (!r$.$correct) return
  mutate(r$.$value)
}
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Login</h1>
    <div :class="$style.innerContainer">
      <RouterLink :to="`${ROUTE_NAMES.auth.forgotPassword}`" :class="$style.description"
        >Forgot your password?</RouterLink
      >

      <form :class="$style.form" @submit.prevent="onSubmit">
        <fieldset :disabled="isPending" :class="$style.fieldset">
          <div :class="$style.inputContainer">
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
            </div>
          </div>

          <AppButton :disabled="!r$.$correct || isPending"
            >Email login
            <template #icon>
              <Spinner v-if="isPending" variant="secondary" />
              <ArrowRight v-else :size="20" />
            </template>
          </AppButton>
        </fieldset>
      </form>
      <OAuthButtons :redirect-path="redirectPath" />
      <TermsText type="signIn" />
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
  text-decoration: underline;
  color: var(--dark-gray);
}

.form {
  margin-bottom: 10px;
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

  span {
    font-weight: 600;
    font-size: 20px;
  }
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

.password-hint {
  font-size: 12px !important;
  letter-spacing: 0.03em;
  color: #36323b;
}

@media screen and (min-width: 768px) {
  .title {
    color: var(--dark-gray);
    font-size: 36px;
  }

  .innerContainer {
    row-gap: 24px;
  }

  .description {
    font-size: 20px;
  }

  .fieldset {
    row-gap: 24px;
  }

  .inputContainer {
    row-gap: 20px;

    span {
      font-weight: 600;
      font-size: 24px;
    }
  }

  .field {
    font-size: 24px;
  }
}
</style>
