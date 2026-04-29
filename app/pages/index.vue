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
