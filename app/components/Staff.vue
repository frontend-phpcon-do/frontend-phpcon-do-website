<script setup lang="ts">
import type { StaffMember } from "../data/staff";

const props = defineProps<{
  member: StaffMember;
}>();

const hasAvatarError = ref(false);
const initial = computed(() => props.member.name.charAt(0));
</script>

<template>
  <component
    :is="member.url ? 'a' : 'div'"
    :href="member.url"
    :target="member.url ? '_blank' : undefined"
    :rel="member.url ? 'noopener' : undefined"
    class="staff-member"
  >
    <span class="staff-member__avatar">
      <img
        v-if="member.avatar_url && !hasAvatarError"
        :src="member.avatar_url"
        :alt="member.name"
        loading="lazy"
        @error="hasAvatarError = true"
      />
      <span v-else class="staff-member__avatar-fallback" aria-hidden="true">
        {{ initial }}
      </span>
    </span>
    <span class="staff-member__name">{{ member.name }}</span>
  </component>
</template>

<style scoped>
.staff-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

a.staff-member:hover .staff-member__avatar {
  border-color: var(--color-line);
  box-shadow: 2px 2px 0 0 var(--color-line);
}

a.staff-member:hover .staff-member__name {
  text-decoration: underline;
}

.staff-member__avatar {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-paper);
  border: 1px solid var(--color-hairline);
  flex-shrink: 0;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.staff-member__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.staff-member__avatar-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.6rem;
  color: var(--color-mute);
  text-transform: uppercase;
}

.staff-member__name {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-ink);
  word-break: break-word;
}
</style>
