export type Conference = {
  name: string;
  nameEn: string;
  /** ISO date string (YYYY-MM-DD) of the conference. */
  data: string;
  id: string;
  url: string;
  venue: string;
};

export type ConferenceGroups = {
  upcoming: Conference[];
  past: Conference[];
};

/** Sort conferences chronologically by their date, leaving the input untouched. */
export const sortConferencesByDate = (conferences: readonly Conference[]): Conference[] =>
  [...conferences].sort((a, b) => a.data.localeCompare(b.data));

/** Format a `Date` as a local `YYYY-MM-DD` key, comparable with conference dates. */
const toDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Split conferences relative to `now` into `upcoming` (today or later, soonest
 * first) and `past` (before today, most recent first). A conference held today
 * counts as upcoming.
 */
export const splitConferencesByDate = (
  conferences: readonly Conference[],
  now: Date,
): ConferenceGroups => {
  const sorted = sortConferencesByDate(conferences);
  const today = toDateKey(now);
  return {
    upcoming: sorted.filter((conference) => conference.data >= today),
    past: sorted.filter((conference) => conference.data < today).reverse(),
  };
};

/** Format an ISO date (YYYY-MM-DD) for display as `YYYY.MM.DD`. */
export const formatConferenceDate = (isoDate: string): string => isoDate.replaceAll("-", ".");
