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
  max-width: var(--section-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
  display: grid;
  justify-items: center;
}
</style>
