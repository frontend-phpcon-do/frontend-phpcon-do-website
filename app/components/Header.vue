<template>
  <header>
    <nav>
      <ul>
        <li>{{ $t('access') }}</li>
      </ul>
      <LangSwitcher />
    </nav>
  </header>
</template>

<script setup lang="ts">
  import LangSwitcher from "./LangSwitcher.vue"

  const { locales, setLocale } = useI18n();
</script>
