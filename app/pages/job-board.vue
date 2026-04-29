<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("jobBoard.heading"),
  ogTitle: () => t("jobBoard.heading"),
  twitterTitle: () => t("jobBoard.heading"),
  description: () => t("jobBoard.description"),
  ogDescription: () => t("jobBoard.description"),
  twitterDescription: () => t("jobBoard.description"),
});
</script>

<template>
  <SectionContainer index="06" :label="$t('nav.jobBoard')">
    <h1>{{ $t("jobBoard.heading") }}</h1>
    <p>{{ $t("jobBoard.description") }}</p>
    <TbdBoard :caption="$t('jobBoard.caption')" :note="$t('jobBoard.note')" tone="pink" />
  </SectionContainer>
</template>
