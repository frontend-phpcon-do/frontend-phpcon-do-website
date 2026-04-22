<script setup lang="ts">
  const {locales, setLocale} = useI18n()
</script>

<template>
  <ul>
    <li v-for="locale in locales">
      <button @click="setLocale(locale.code)">{{locale.name}}</button>
    </li>
  </ul>
</template>
