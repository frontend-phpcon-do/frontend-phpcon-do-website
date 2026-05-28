<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("timetable.heading"),
  ogTitle: () => t("timetable.heading"),
  twitterTitle: () => t("timetable.heading"),
  description: () => t("timetable.description"),
  ogDescription: () => t("timetable.description"),
  twitterDescription: () => t("timetable.description"),
});
</script>

<template>
  <SectionContainer index="05" :label="$t('nav.timetable')">
    <h1>{{ $t("timetable.heading") }}</h1>
    <p>{{ $t("timetable.description") }}</p>
    <TbdBoard :caption="$t('timetable.caption')" :note="$t('timetable.note')" tone="blue" />
  </SectionContainer>
</template>
