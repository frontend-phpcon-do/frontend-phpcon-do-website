<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>

<template>
  <ul class="lang-switcher">
    <li v-for="l in locales" :key="l.code">
      <button
        type="button"
        class="lang-switcher__button"
        :class="{ 'lang-switcher__button--active': l.code === locale }"
        :aria-current="l.code === locale ? 'true' : undefined"
        @click="setLocale(l.code)"
      >
        {{ l.code.toUpperCase() }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.lang-switcher__button {
  appearance: none;
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: inherit;
  cursor: pointer;
}

.lang-switcher__button--active {
  color: var(--theme-pink);
}
</style>
