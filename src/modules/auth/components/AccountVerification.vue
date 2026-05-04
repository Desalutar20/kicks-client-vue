<script setup lang="ts">
import { useVerifyAccount } from '@/modules/auth/composables/use-verify-account.ts'
import Spinner from '@/core/components/ui/Spinner.vue'
import { CheckCircle2, XCircle } from '@lucide/vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'
import { useCountdown } from '@/core/composables/use-countdown.ts'
import { computed, onMounted } from 'vue'
import AppButton from '@/core/components/ui/AppButton.vue'
import type { VerifyAccountInput } from '@/modules/auth/schemas/verify-account.schema.ts'

const { data } = defineProps<{
  data: VerifyAccountInput
}>()

const router = useRouter()

const maxRedirectSeconds = 10
const { start, seconds: redirectSeconds } = useCountdown({
  seconds: maxRedirectSeconds,
  onFinish: () => router.push({ name: ROUTE_NAMES.auth.signIn }),
})

const { mutate, isPending, isError, isSuccess } = useVerifyAccount({
  onSuccess: () => start(),
})

onMounted(() => mutate(data))

const progress = computed(() => {
  const value = ((maxRedirectSeconds - redirectSeconds.value) / maxRedirectSeconds) * 100

  return `${value}%`
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.innerContainer">
      <div v-if="isPending" :class="$style.box">
        <Spinner size="md" />
        <h2 :class="$style.title">Verifying your account</h2>
        <p :class="$style.loadingText">Please wait a few seconds</p>
      </div>
      <div v-if="isSuccess" :class="$style.box">
        <CheckCircle2 style="color: limegreen" :size="48" />
        <h2 :class="$style.title" style="color: limegreen">Account verified!</h2>
        <p :class="$style.successText">
          Redirecting in <span>{{ redirectSeconds }}</span
          >seconds...
        </p>
        <div :class="$style.progressTrack">
          <div :class="$style.progressFill" :style="{ width: progress }" />
        </div>
      </div>
      <div v-if="isError" :class="$style.box">
        <XCircle :size="48" style="color: red" />
        <h2 :class="$style.title" style="color: red">Account verification failed</h2>
        <p :class="$style.errorText">The verification link may be expired or invalid.</p>
        <AppButton @click="() => router.push({ name: ROUTE_NAMES.auth.signIn })"
          >Go to login</AppButton
        >
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.innerContainer {
  max-width: 448px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 40px;
  border-radius: 24px;
  backdrop-filter: blur(24px);
  background-color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.3);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
}

.loadingText {
  color: var(--gray-main);
  font-size: 14px;
}

.title {
  font-size: 24px;
  font-weight: 600;
}

.successText {
  font-size: 14px;
  margin-bottom: 4px;

  span {
    font-weight: 600;
    color: var(--gray-main);
    padding: 0 4px;
  }
}
.progressTrack {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: rgba(74, 222, 128, 0.8);
  transition: width 1s linear;
}

.errorText {
  font-size: 14px;
}
</style>
