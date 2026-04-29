<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: () => `${t("jobBoard.heading")} | ${t("site.name")}`,
});
</script>

<template>
  <SectionContainer index="06" :label="$t('nav.jobBoard')">
    <h1>{{ $t("jobBoard.heading") }}</h1>
    <p>{{ $t("jobBoard.description") }}</p>
    <TbdBoard :caption="$t('jobBoard.caption')" :note="$t('jobBoard.note')" tone="pink" />
  </SectionContainer>
</template>
