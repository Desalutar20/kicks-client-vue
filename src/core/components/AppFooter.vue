<script setup lang="ts">
import facebookIcon from '@/core/assets/icons/facebook.svg'
import instagramIcon from '@/core/assets/icons/instagram.svg'
import mediumLogoIcon from '@/core/assets/icons/medium-logo.svg'
import tiktokIcon from '@/core/assets/icons/tiktok.svg'
import twitterIcon from '@/core/assets/icons/twitter.svg'
</script>

<template>
  <footer :class="$style.footer">
    <div :class="$style.top">
      <div :class="$style.newsletter">
        <p :class="$style.title">Join our KicksPlus Club & get 15% off</p>

        <p :class="$style.subtitle">Sign up for free! Join the community.</p>

        <form :class="$style.form">
          <input type="email" placeholder="Email address" :class="$style.input" />
          <button :class="$style.button">Submit</button>
        </form>
      </div>

      <img :class="$style.logoTop" :src="mediumLogoIcon" alt="Kicks" />
    </div>

    <div :class="$style.bottom">
      <div :class="$style.content">
        <div :class="$style.block">
          <span :class="$style.heading">About us</span>
          <p :class="$style.text" style="max-width: 370px; line-height: 150%">
            We are the biggest hyperstore in the universe. We got you all cover with our exclusive
            collections and latest drops.
          </p>
        </div>

        <div :class="$style.block">
          <span :class="$style.heading">Categories</span>
          <ul :class="[$style.list, $style.text]">
            <li>Runners</li>
            <li>Sneakers</li>
            <li>Basketball</li>
            <li>Outdoor</li>
            <li>Golf</li>
            <li>Hiking</li>
          </ul>
        </div>

        <div :class="$style.block">
          <span :class="$style.heading">Company</span>
          <ul :class="[$style.list, $style.text]">
            <li>About</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
        </div>

        <div :class="$style.block">
          <span :class="$style.heading">Company</span>
          <ul :class="$style.social">
            <li><img :src="facebookIcon" alt="facebook" /></li>
            <li><img :src="instagramIcon" alt="instagram" /></li>
            <li><img :src="twitterIcon" alt="twitter" /></li>
            <li><img :src="tiktokIcon" alt="tiktok" /></li>
          </ul>
        </div>
      </div>

      <img :class="$style.logoBottomDesktop" :src="mediumLogoIcon" alt="Kicks" />
    </div>

    <img :class="$style.logoBottomMobile" :src="mediumLogoIcon" alt="Kicks" />
  </footer>
</template>

<style module>
.footer {
  width: 100%;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: var(--blue);
  padding: 16px 16px 80px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.newsletter {
  display: flex;
  flex-direction: column;
  max-width: 510px;
}

.title {
  font-weight: 600;
  color: white;
  font-size: 32px;
  margin-bottom: 8px;
  text-transform: none;
  line-height: 120%;
}

.subtitle {
  font-weight: 600;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.7);
}

.form {
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  max-width: 420px;
}

.input {
  width: 100%;
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  outline: none;
  background-color: transparent;
  color: var(--white);
  border: 1px solid var(--white);
}

.input::placeholder {
  color: var(--white);
}

.button {
  padding: 10px 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.logoTop {
  width: 240px;
}

.bottom {
  background: var(--dark-gray);
  border-radius: 24px;
  transform: translateY(-40px);
  overflow: hidden;
  padding: 24px 16px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 446px;
}

.heading {
  color: var(--yellow);
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.text {
  color: var(--gray);
  font-weight: 600;
  font-family: var(--second-family);
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social {
  list-style: none;
  display: flex;
  gap: 18px;
  padding: 0;
  margin: 0;
}

.social img {
  width: 24px;
  height: 24px;
}

.logoBottomDesktop {
  display: none;
}

.logoBottomMobile {
  width: 100%;
  height: 120px;
  object-fit: contain;
  transform: translateY(28px);
}

@media (min-width: 400px) {
  .form {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .top {
    flex-direction: row;
    justify-content: space-between;
    padding: 64px 72px 72px;
    gap: 20px;
  }

  .newsletter {
    max-width: 600px;
  }

  .title {
    font-size: 48px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .subtitle {
    font-size: 20px;
  }

  .bottom {
    border-radius: 48px;
    padding: 40px;
    transform: translateY(-48px);
  }

  .content {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 100px;
  }

  .logoBottomDesktop {
    display: block;
    width: 100%;
    transform: translateY(96px);
  }

  .logoBottomMobile {
    display: none;
  }
}

@media (min-width: 1280px) {
  .top {
    padding-right: 184px;
  }

  .logoBottomDesktop {
    transform: translateY(120px);
  }
}
</style>
