import { describe, expect, it } from "vite-plus/test";
import {
  formatConferenceDate,
  sortConferencesByDate,
  splitConferencesByDate,
  type Conference,
} from "../../app/utils/conferences";

const make = (id: string, data: string): Conference => ({
  id,
  data,
  name: id,
  nameEn: id,
  url: `https://example.com/${id}`,
  venue: "venue",
});

describe("sortConferencesByDate", () => {
  it("orders conferences from earliest to latest date", () => {
    const conferences = [
      make("tokyo", "2026-12-05"),
      make("nagoya", "2026-05-09"),
      make("kansai", "2026-10-12"),
      make("fukuoka", "2026-09-12"),
    ];

    const result = sortConferencesByDate(conferences);

    expect(result.map((c) => c.id)).toEqual(["nagoya", "fukuoka", "kansai", "tokyo"]);
  });

  it("does not mutate the input array", () => {
    const conferences = [make("b", "2026-02-01"), make("a", "2026-01-01")];

    sortConferencesByDate(conferences);

    expect(conferences.map((c) => c.id)).toEqual(["b", "a"]);
  });
});

describe("splitConferencesByDate", () => {
  const conferences = [
    make("tokyo", "2026-12-05"),
    make("nagoya", "2026-05-09"),
    make("kansai", "2026-10-12"),
    make("fukuoka", "2026-09-12"),
  ];

  it("puts today-or-later in upcoming (soonest first) and earlier in past (most recent first)", () => {
    const result = splitConferencesByDate(conferences, new Date(2026, 5, 2)); // 2026-06-02

    expect(result.upcoming.map((c) => c.id)).toEqual(["fukuoka", "kansai", "tokyo"]);
    expect(result.past.map((c) => c.id)).toEqual(["nagoya"]);
  });

  it("treats a conference held today as upcoming", () => {
    const result = splitConferencesByDate([make("today", "2026-06-02")], new Date(2026, 5, 2));

    expect(result.upcoming.map((c) => c.id)).toEqual(["today"]);
    expect(result.past).toEqual([]);
  });

  it("returns empty groups for empty input", () => {
    expect(splitConferencesByDate([], new Date(2026, 5, 2))).toEqual({ upcoming: [], past: [] });
  });
});

describe("formatConferenceDate", () => {
  it("formats an ISO date as YYYY.MM.DD", () => {
    expect(formatConferenceDate("2026-05-09")).toBe("2026.05.09");
  });
});
