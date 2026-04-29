<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("site.name"),
  ogTitle: () => t("site.name"),
  twitterTitle: () => t("site.name"),
  description: () => t("site.description"),
  ogDescription: () => t("site.description"),
  twitterDescription: () => t("site.description"),
});
</script>

<template>
  <HeroSection />

  <SectionContainer id="overview" index="01" label="Overview">
    <h2>{{ $t("overview.heading") }}</h2>
    <p>{{ $t("overview.description") }}</p>
  </SectionContainer>

  <NewsSection />

  <SponsorsSection />

  <StaffSection />
</template>
