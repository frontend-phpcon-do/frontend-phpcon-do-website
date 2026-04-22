<template>
  <SectionContainer class="hero-section">
    <h1 class="hero-section__title">
      {{ $t('site.name') }}
    </h1>
    <p class="hero-section__date">
      <time datetime="2026-06-06T10:40">{{ $t('site.date') }}</time>
    </p>
    <p class="hero-section__venue">
      {{ $t('site.venue') }}
    </p>
  </SectionContainer>
</template>

<style scoped>
.hero-section {
  padding-block: 80px;
}

.hero-section__title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-align: center;
}

.hero-section__date {
  margin: 24px 0 0;
  font-size: 1.125rem;
  text-align: center;
}

.hero-section__venue {
  margin: 8px 0 0;
  font-size: 1.125rem;
  text-align: center;
}
</style>
