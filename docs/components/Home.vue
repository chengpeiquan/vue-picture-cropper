<template>
  <div class="home">
    <div class="logo">
      <img src="/logo.svg" :alt="locales.name" />
    </div>

    <h1 class="name">
      <span class="clip">{{ locales.name }}</span>
    </h1>

    <p class="tagline">{{ locales.description }}</p>

    <a class="version" href="https://www.npmjs.com/package/vue-picture-cropper">
      <img
        src="https://img.shields.io/npm/v/vue-picture-cropper?color=3fb984&label=npm"
      />
    </a>

    <div class="action">
      <a class="btn" :href="locales.action.link">
        <span>{{ locales.action.text }}</span>
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          data-v-76d4cf95=""
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
            data-v-76d4cf95=""
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLocales } from '../locales/home'
const locales = getLocales()
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  .logo {
    width: 200px;
    max-width: 100%;
    margin-bottom: 24px;
  }
  .name {
    line-height: 40px;
    font-size: 32px;
    font-weight: bold;
    color: var(--vp-home-hero-name-color);
    white-space: pre-wrap;
    margin-bottom: 8px;
    .clip {
      background: var(--vp-home-hero-name-background);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: var(--vp-home-hero-name-color);
    }
  }
  .tagline {
    white-space: pre-wrap;
    color: var(--vp-c-text-2);
    line-height: 28px;
    font-size: 18px;
    text-align: center;
    max-width: 300px;
    margin-bottom: 24px;
  }
  .version {
    margin-bottom: 64px;
  }
  .action {
    display: flex;
    flex-shrink: 0;
    padding: 6px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid transparent;
      white-space: nowrap;
      transition: color 0.25s, border-color 0.25s, background-color 0.25s;
      border-radius: 20px;
      padding: 0 20px;
      line-height: 38px;
      font-size: 14px;
      min-width: 120px;
      border-color: var(--vp-button-brand-border);
      color: var(--vp-button-brand-text);
      background-color: var(--vp-button-brand-bg);
      .icon {
        fill: var(--vp-button-brand-text);
        margin-left: 8px;
      }
    }
  }
}

@media (min-width: 960px) {
  .home {
    .logo {
      width: 400px;
    }
    .name {
      line-height: 64px;
      font-size: 56px;
    }
    .tagline {
      line-height: 36px;
      font-size: 24px;
      max-width: 100%;
    }
    .action {
      .btn {
        &:hover {
          border-color: var(--vp-button-brand-hover-border);
          color: var(--vp-button-brand-hover-text);
          background-color: var(--vp-button-brand-hover-bg);
        }
      }
    }
  }
}
</style>
