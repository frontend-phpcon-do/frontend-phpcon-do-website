<template>
  <section class="section-container">
    <div class="section-container__inner">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section-container {
  width: 100%;
}

.section-container__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
}
</style>
