<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: () => `${t("timetable.heading")} | ${t("site.name")}`,
});
</script>

<template>
  <SectionContainer index="05" :label="$t('nav.timetable')">
    <h1>{{ $t("timetable.heading") }}</h1>
    <p>{{ $t("timetable.description") }}</p>
    <TbdBoard :caption="$t('timetable.caption')" :note="$t('timetable.note')" tone="blue" />
  </SectionContainer>
</template>
