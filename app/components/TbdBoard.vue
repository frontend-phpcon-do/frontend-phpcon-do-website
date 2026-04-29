<script setup lang="ts">
defineProps<{
  caption?: string;
  note?: string;
  tone?: "pink" | "blue";
}>();
</script>

<template>
  <div class="tbd-board" :data-tone="tone ?? 'pink'">
    <div class="tbd-board__frame">
      <span class="tbd-board__rivet tbd-board__rivet--tl" aria-hidden="true" />
      <span class="tbd-board__rivet tbd-board__rivet--tr" aria-hidden="true" />
      <span class="tbd-board__rivet tbd-board__rivet--bl" aria-hidden="true" />
      <span class="tbd-board__rivet tbd-board__rivet--br" aria-hidden="true" />

      <p v-if="caption" class="tbd-board__caption">{{ caption }}</p>
      <p class="tbd-board__sign">
        <span class="tbd-board__t">T</span>
        <span class="tbd-board__b">B</span>
        <span class="tbd-board__d">D</span>
      </p>
      <p v-if="note" class="tbd-board__note">{{ note }}</p>

      <div class="tbd-board__tape" aria-hidden="true">
        <span>UNDER CONSTRUCTION</span>
        <span class="tbd-board__star">✦</span>
        <span>COMING SOON</span>
        <span class="tbd-board__star">✦</span>
      </div>
    </div>
    <span class="tbd-board__post tbd-board__post--left" aria-hidden="true" />
    <span class="tbd-board__post tbd-board__post--right" aria-hidden="true" />
  </div>
</template>

<style scoped>
.tbd-board {
  --tbd-accent: var(--theme-pink);
  position: relative;
  width: min(100%, 560px);
  display: grid;
  justify-items: center;
  padding-bottom: 28px;
  margin-inline: auto;
}

.tbd-board[data-tone="blue"] {
  --tbd-accent: var(--theme-blue);
}

.tbd-board__frame {
  position: relative;
  width: 100%;
  background: var(--color-paper);
  border: 2px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: 32px 28px 24px;
  box-shadow:
    8px 8px 0 0 var(--color-line),
    inset 0 0 0 6px var(--color-paper),
    inset 0 0 0 7px var(--tbd-accent);
  display: grid;
  gap: 14px;
  text-align: center;
  overflow: hidden;
  z-index: 1;
}

.tbd-board__rivet {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-line);
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.4);
}

.tbd-board__rivet--tl {
  top: 12px;
  left: 12px;
}
.tbd-board__rivet--tr {
  top: 12px;
  right: 12px;
}
.tbd-board__rivet--bl {
  bottom: 12px;
  left: 12px;
}
.tbd-board__rivet--br {
  bottom: 12px;
  right: 12px;
}

.tbd-board__caption {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-mute);
}

.tbd-board__sign {
  margin: 4px 0 6px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(4rem, 14vw, 7rem);
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: var(--color-ink);
  display: inline-flex;
  justify-content: center;
  gap: 0.04em;
}

.tbd-board__sign span {
  display: inline-block;
}

.tbd-board__t {
  color: var(--color-ink);
  transform: rotate(-2deg);
}

.tbd-board__b {
  color: var(--tbd-accent);
  transform: rotate(1deg);
}

.tbd-board__d {
  color: var(--color-ink);
  transform: rotate(-1deg);
}

.tbd-board__note {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-mute);
  max-width: 28em;
  margin-inline: auto;
}

.tbd-board__tape {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 6px 12px;
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transform: rotate(-1.5deg);
  margin-inline: -36px;
}

.tbd-board__star {
  color: var(--tbd-accent);
}

.tbd-board__post {
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 28px;
  background: var(--color-line);
  border-radius: 0 0 4px 4px;
  z-index: 0;
}

.tbd-board__post--left {
  left: 22%;
}

.tbd-board__post--right {
  right: 22%;
}

@media (max-width: 480px) {
  .tbd-board__frame {
    padding: 28px 18px 20px;
  }
  .tbd-board__tape {
    margin-inline: -20px;
    gap: 10px;
  }
}
</style>
