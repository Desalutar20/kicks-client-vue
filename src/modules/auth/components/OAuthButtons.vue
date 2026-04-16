<script setup lang="ts">
import { OAuthProvider } from '@/modules/auth/types/oauth-provider.type.ts'
import googleIcon from '../assets/google.svg'
import facebookIcon from '../assets/facebook.svg'
import AppButton from '@/core/components/ui/AppButton.vue'
import { config } from '@/config.ts'

const { redirectPath } = defineProps<{ redirectPath?: string }>()

const providers: { icon: string; provider: OAuthProvider; alt: string }[] = [
  {
    icon: googleIcon,
    provider: OAuthProvider.google,
    alt: 'google',
  },
  {
    icon: facebookIcon,
    provider: OAuthProvider.facebook,
    alt: 'facebook',
  },
]
</script>

<template>
  <div class="container">
    <form
      v-for="{ icon, alt, provider } in providers"
      :key="provider"
      :action="`${config.apiUrl}${config.apiPrefix}/auth/${provider}`"
    >
      <input v-if="redirectPath" type="hidden" name="redirectPath" :value="redirectPath" />
      <AppButton variant="ghost" class="btn">
        <img class="icon" :src="icon" :alt="alt" />
      </AppButton>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
}

.btn {
  border: 1px solid var(--dark-gray);
  padding: 16px 48px !important;
  border-radius: 12px;
  height: 56px !important;
}

.icon {
  width: 24px;
  height: 24px;
}

@media screen and (min-width: 768px) {
  .container {
    column-gap: 24px;
  }

  .btn {
    padding-left: 57px;
    padding-right: 57px;
    height: 16px;
  }

  .icon {
    width: 32px;
    height: 32px;
  }
}
</style>
