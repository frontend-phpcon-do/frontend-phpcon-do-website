<script setup lang="ts">
import {
  manualSponsorPlansBeforeApi,
  type SponsorItem,
  type SponsorPlan,
} from "../data/manual-sponsors";

type SponsorsResponse = {
  sponsor_plans: SponsorPlan[];
};

const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();
const apiBase = runtimeConfig.public.apiBase;

useSeoMeta({
  title: () => t("jobBoard.heading"),
  ogTitle: () => t("jobBoard.heading"),
  twitterTitle: () => t("jobBoard.heading"),
  description: () => t("jobBoard.description"),
  ogDescription: () => t("jobBoard.description"),
  twitterDescription: () => t("jobBoard.description"),
});

const { data } = await useFetch<SponsorsResponse>(`${apiBase}/sponsors`);

const jobBoardSponsors = computed<SponsorItem[]>(() => {
  const eligibleApiPlans = (data.value?.sponsor_plans ?? [])
    .map((plan) => ({ ...plan, name: plan.name.trim() }))
    .filter((plan) => plan.name.toLowerCase() !== "booth")
    .filter((plan) => plan.tier === "A" || plan.tier === "B");

  const eligibleManualPlans = manualSponsorPlansBeforeApi.filter(
    (plan) => plan.tier === "A" || plan.tier === "B",
  );

  const seen = new Set<string>();
  return [...eligibleManualPlans, ...eligibleApiPlans]
    .flatMap((plan) => plan.sponsors)
    .filter((sponsor) => {
      if (seen.has(sponsor.id)) return false;
      seen.add(sponsor.id);
      return true;
    });
});
</script>

<template>
  <SectionContainer index="06" :label="$t('nav.jobBoard')">
    <h1>{{ $t("jobBoard.heading") }}</h1>
    <p>{{ $t("jobBoard.description") }}</p>

    <ul v-if="jobBoardSponsors.length" class="job-board__grid">
      <li v-for="sponsor in jobBoardSponsors" :key="sponsor.id" class="job-board__item">
        <JobBoardCard :sponsor="sponsor" />
      </li>
    </ul>
  </SectionContainer>
</template>

<style scoped>
.job-board__grid {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

.job-board__item {
  display: flex;
}

.job-board__item > :deep(.job-card) {
  width: 100%;
}

@media (min-width: 768px) {
  .job-board__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .job-board__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
</style>
