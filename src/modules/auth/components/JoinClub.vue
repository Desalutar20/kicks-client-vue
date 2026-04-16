<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import AppButton from '@/core/components/ui/AppButton.vue'
</script>

<template>
  <div :class="$style['join-club']">
    <div :class="$style['join-club__content']">
      <p :class="$style['join-club__title']">Join Kicks Club Get Rewarded Today.</p>

      <p :class="$style['join-club__text']">
        As kicks club member you get rewarded with what you love for doing what you love. Sign up
        today and receive immediate access to these Level 1 benefits:
      </p>

      <ul :class="$style['join-club__list']">
        <li>Free shipping</li>
        <li>A 15% off voucher for your next purchase</li>
        <li>Access to Members Only products and sales</li>
        <li>Access to adidas Running and Training apps</li>
        <li>Special offers and promotions</li>
      </ul>

      <p :class="$style['join-club__text']">
        Join now to start earning points, reach new levels and unlock more rewards and benefits from
        adiClub.
      </p>
    </div>

    <AppButton :class="$style['join-club__button']">
      <span>join the club</span>
      <template #icon>
        <ArrowRight />
      </template>
    </AppButton>
  </div>
</template>

<style module>
.join-club {
  background: #fff;
  padding: 24px 16px;
  border-radius: 16px;
  max-width: 731px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.join-club__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  font-weight: 600;
}

.join-club__title {
  max-width: 288px;
  font-size: 24px;
  opacity: 0.8;
  line-height: 120%;
}

.join-club__text {
  font-size: 14px;
  opacity: 0.8;
  font-family: var(--second-family);
}

.join-club__list {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin-left: 20px;
  list-style: disc;
  font-size: 14px;
  opacity: 0.8;
  font-family: var(--second-family);
}

@media (min-width: 768px) {
  .join-club {
    padding: 24px;
  }

  .join-club__content {
    margin-bottom: 64px;
  }

  .join-club__title {
    font-size: 36px;
    max-width: 658px;
  }

  .join-club__text {
    font-size: 16px;
  }

  .join-club__list {
    font-size: 16px;
  }
}
</style>
